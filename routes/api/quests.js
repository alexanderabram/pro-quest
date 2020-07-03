const express = require("express");
const router = express.Router();
const quests = require("../../quests.js");

// Display all quests
router.get("/", (req, res) => res.json(quests));

//Single quest
router.get("/:id", (req, res) => {
    id = parseInt(req.params.id)
    const found = quests.some(quest => quest.id === id);

    if (found) {
        res.json(quests.filter(quest => quest.id === id));
    } else {
        res.status(400).json({ msg: `quest ${id} not found` })
    }
});

// New quest
router.post("/", (req, res) => {
    //db will auto inc ID!
    const newquest = {
        id: "",
        name: req.body.name,
        status: "active"
    }
    if (!newquest.name) {
        return res.status(400).json({ msg: "Must be Named"})
    }
    quests.push(newquest)
    //res.json(quests)
    res.redirect("/")
}) 

// Edit quest
router.put("/:id", (req, res) => {
    id = parseInt(req.params.id)
    const found = quests.some(quest => quest.id === id);

    if (found) {
        const upquest = req.body
        quests.forEach(quest => {
            if (quest.id === id) {
                quest.name = upquest.name ? upquest.name : member.name;
                quest.status = upquest.status ? upquest.status : quest.status;

                res.json({msg: "member updated", quest})
            }
        });

        res.json(quests.filter(quest => quest.id === id));
    } else {
        res.status(400).json({ msg: `quest ${id} not found` })
    }
});

//Delete 
router.delete("/:id", (req, res) => {
    id = parseInt(req.params.id)
    const found = quests.some(quest => quest.id === id);

    if (found) {
        res.json( { msg: "deleted", 
        quests: quests.filter(quest => quest.id !== id)
    });
    } else {
        res.status(400).json({ msg: `quest ${id} not found` });
    }
});



module.exports = router;