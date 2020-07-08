/* eslint-disable prettier/prettier */
/* eslint-disable implicit-arrow-linebreak */
const Mission = require("../models/app/Mission");
const Quest = require("../models/app/Quest");
const People = require("../models/app/People");
module.exports = function(app) {
  // Display all Missions
  app.get("/missions", (req, res) =>
    Mission.findAll()
      .then(missions => {
        res.render("home", {
          missions
        });
      })
      .catch(err => console.log(err))
  );

  // Display All Quests
  app.get("/quests", (req, res) =>
    Quest.findAll()
      .then(quests => {
        return res.render("home", {
          quests
        });
      })
      .catch(err => console.log(err))
  );

  app.get("/missions/all", (req, res) =>
    Mission.findAll()
      .then(missions => {
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
    Mission.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(results => {
        if (!results[0]) {
          return res.redirect("/missions/add");
        }
        const mission = results[0].dataValues;
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
        Quest.findAll({
          where: {
            misId: id,
            status: false
          }
        }).then(results => {
          const quests = results;
          res.render("view", {
            name,
            status,
            due,
            createdAt,
            owners,
            description,
            id,
            quests
          });
        });
      })
      .catch(err => console.log(err));
  });

  // New Mission
  app.post("/missions/add", (req, res) => {
    console.log("add");
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
      Mission.create({
        name,
        due,
        status,
        owners,
        description
      })
        .then(Mission => {
          const id = Mission.dataValues.id;

          quests.forEach(quest => {
            // Insert Into Table
            Quest.create({
              name: quest,
              misId: id
            });
          });
          res.redirect("/missions/" + id);
        })
        .catch(err => console.log(err));
    }
  });

  // COMPLETE QUEST
  app.get("/quest/update/:id", async (req, res) => {
    Quest.findAll({
      where: {
        id: req.params.id
      }
    }).then(results => {   
      const misId = results[0].dataValues.misId;
      Quest.destroy({
        where: {
          id: req.params.id
        }
      }),
      Mission.findAll({
        where: {
          id: misId
        }
      }).then(results => {
        const username = results[0].dataValues.owners;
        const id = results[0].dataValues.id;
        People.findAll({
          where: {
            username: username
          }
        }).then(user => {
          score = user[0].dataValues.score;
          score = score + 1;
          console.log(username + "'s " + "score is: " + score);
          People.update(
            { score: score },
            {
              where: {
                username: username
              }
            }
          ).then(res.redirect("/missions/" + id));
        });
      });
    });
  });

  //EDIT
  app.get("/missions/edit/:id", (req, res) => {
    Mission.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(results => {
        mission = results[0].dataValues;

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
