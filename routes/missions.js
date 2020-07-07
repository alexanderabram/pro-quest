/* eslint-disable implicit-arrow-linebreak */
const Mission = require("../models/app/Mission");
const Quest = require("../models/app/Quest");
module.exports = function(app) {
  // Display all Missions
  console.log("DISPLAY ALL");
  app.get("/missions", (req, res) =>
    Mission.findAll()
      .then(missions => {
        res.render("home", {
          missions
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
          res.redirect("/missions/add");
        }
        console.log("Passing over single ID");
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
            misId: id
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
      res.render("add", {
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
          console.log(typeof id);

          quests.forEach(quest => {
            Quest.create({
              name: quest,
              misId: id
            });
          });
          res.redirect("/missions/");
        })
        .catch(err => console.log(err));
      // Insert Into Table
    }
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
