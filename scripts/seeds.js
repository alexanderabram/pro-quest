const db = require("../models");

db.Mission.bulkCreate([
  {
    name: "Our First Mission",
    description: "A Test Mission",
    owners: "Alex",
    status: false,
    due: "01/10/2021"
  },
  {
    name: "Our 2 Mission",
    description: "Mission 22",
    owners: "Alex",
    status: false,
    due: "01/10/2021"
  }
]);

db.Quest.bulkCreate([
  { name: "First Quest" },
  { name: "2 Quest" },
  { name: "3 Quest" }
]);

db.People.bulkCreate([
  { username: "Lex" },
  { username: "Alex" },
  { username: "Grigore" }
]);
