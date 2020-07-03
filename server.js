const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars")
const app = express();
const logger = require("./config/middleware/logger");

const missions = require("./Missions")
//app.use(logger);
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


//HandleBars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use("/api/missions", require("./routes/api/missions"));

//HOMEPAGE ROUTE
app.get("/", (req, res) => res.render("missions", {
    title: "Mission App",
    missions: missions

}));
//QUEST ROUTE
app.get("/", (req, res) => res.render("quests", {
    title: "Mission Quests",
    quests: quests

}));



const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
