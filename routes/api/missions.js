const express = require("express");
const router = express.Router();
const missions = require("../../Missions.js");

// Display all Missions
router.get("/", (req, res) => res.json(missions));

//Single Mission
router.get("/:id", (req, res) => {
  id = parseInt(req.params.id);
  const found = missions.some(mission => mission.id === id);

  if (found) {
    
    res.send(missions.filter(mission => mission.id === id));


  } else {
    res.status(400).json({ msg: `Mission ${id} not found` });
  }
});

// New Mission
router.post("/", (req, res) => {
  //db will auto inc ID!
  const newMission = {
    id: "",
    name: req.body.name,
    status: req.body.status
  };
  if (!newMission.name) {
    return res.status(400).json({ msg: "Must be Named" });
  }
  missions.push(newMission);
  //res.json(missions)
  res.redirect("/");
});

// Edit Mission
router.put("/:id", (req, res) => {
  id = parseInt(req.params.id);
  const found = missions.some(mission => mission.id === id);

  if (found) {
    const upMission = req.body;
    missions.forEach(mission => {
      if (mission.id === id) {
        mission.name = upMission.name ? upMission.name : member.name;
        mission.status = upMission.status ? upMission.status : mission.status;

        res.json({ msg: "member updated", mission });
      }
    });

    res.json(missions.filter(mission => mission.id === id));
  } else {
    res.status(400).json({ msg: `Mission ${id} not found` });
  }
});

//Delete
router.delete("/:id", (req, res) => {
  id = parseInt(req.params.id);
  const found = missions.some(mission => mission.id === id);

  if (found) {
    res.json({
      msg: "deleted",
      missions: missions.filter(mission => mission.id !== id)
    });
  } else {
    res.status(400).json({ msg: `Mission ${id} not found` });
  }
});

module.exports = router;
