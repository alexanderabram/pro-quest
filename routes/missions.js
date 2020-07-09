/* eslint-disable prettier/prettier */
/* eslint-disable implicit-arrow-linebreak */
const db = require("../models");

module.exports = function (app) {
  // Display all Missions
  app.get("/missions", (req, res) =>
    db.Mission.findAll()
      .then(results => {
        const missions = JSON.parse(JSON.stringify(results));

        res.render("home", {
          missions
        });
      })
      .catch(err => console.log(err))
  );

  // Display All Quests
  app.get("/quests", (req, res) =>
    db.Quest.findAll()
      .then(results => {
        const quests = JSON.parse(JSON.stringify(results));
        return res.render("home", {
          quests
        });
      })
      .catch(err => console.log(err))
  );

  app.get("/missions/all", (req, res) =>
    db.Mission.findAll()
      .then(results => {
        const missions = JSON.parse(JSON.stringify(results));
        res.render("missions", {
          missions
        });
      })
      .catch(err => console.log(err))
  );

  // Add Form Route
  app.get("/missions/add", (req, res) => {
    res.render("add_mission", {
      title: "Add a Mission"
    });
  });

  //Single Mission
  app.get("/missions/:id", (req, res) => {
    db.Mission.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Quest]
    }).then(result => {
      console.log("Result: ", result);
      const mission = JSON.parse(JSON.stringify(result));

      console.log("Mission: ", mission);
      const {
        name,
        due,
        status,
        createdAt,
        owners,
        description,
        id
      } = mission;
      // ADD QUESTS TO DISPLAY BY ID
      res.render("view", {
        name,
        status,
        due,
        createdAt,
        owners,
        description,
        id,
        quests: mission.Quests,
      });
    })
      .catch(err => console.log(err));
  });

  // New Mission
  app.post("/missions/add", (req, res) => {
    const { name, due, status, owners, description } = req.body;
    const quests = req.body.quests.split(",");

    const errors = [];
    //Validation
    if (!name) {
      errors.push({ text: "Please add a title." });
    }
    if (!description) {
      errors.push({ text: "Please add a description." });
    }
    if (!owners) {
      errors.push({ text: "Please add a team." });
    }

    if (errors.length > 0) {
      res.render("add_mission", {
        errors,
        name,
        due,
        status,
        owners,
        description
      });
    } else {
      // Insert Into Table
      db.Mission.create({
        name,
        due,
        status,
        owners,
        description
      })
        .then(mission => {
          const id = mission.dataValues.id;

          quests.forEach(quest => {
            // Insert Into Table
            db.Quest.create({
              name: quest,
              MissionId: id
            });
          });
          res.redirect("/missions/" + id);
        })
        .catch(err => console.log(err));
    }
  });

  // COMPLETE QUEST
  app.get("/quest/update/:id", async (req, res) => {
    const questData = await db.Quest.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Mission]
    });

    const quest = await JSON.parse(JSON.stringify(questData));

    await db.Quest.destroy({
      where: {
        id: req.params.id
      }
    });

    const username = quest.Mission.owners;
    const id = quest.Mission.id;

    const peopleData = await db.People.findOne({
      where: {
        username: username
      }
    });
    const user = JSON.parse(JSON.stringify(peopleData));
    console.log("USER:", user);
    score = user.score;
    score = score + 1;
    console.log(username + "'s " + "score is: " + score);
    await db.People.update(
      { score: score },
      {
        where: {
          username: username
        }
      });
    res.redirect("/missions/" + id);
  });

  //EDIT
  app.get("/missions/edit/:id", (req, res) => {
    db.Mission.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(result => {
        const mission = JSON.parse(JSON.stringify(result));
        const { name, due, status, createdAt, owners, description } = mission;

        res.render("edit_mission", {
          title: "EDIT",
          name,
          status,
          due,
          createdAt,
          owners,
          description
        });
      })
      .catch(err => console.log(err));
  });
};
