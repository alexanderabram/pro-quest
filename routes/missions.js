/* eslint-disable implicit-arrow-linebreak */
const Mission = require("../models/app/Mission");

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
        console.log(results);

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

        res.render("view", {
          name,
          status,
          due,
          createdAt,
          owners,
          description,
          id
        });
      })
      .catch(err => console.log(err));
  });

  // New Mission
  app.post("/missions/add", (req, res) => {
    console.log("add");

    const { name, due, status, quests, owners, description } = req.body;
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
        quests,
        owners,
        description
      });
    } else {
      // Insert Into Table
      Mission.create({
        name,
        due,
        status,
        quests,
        owners,
        description
      })
        .then(mission => res.redirect("/missions"))
        .catch(err => console.log(err));
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
