const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const logger = require("./config/middleware/logger");

const missions = require("./Missions");
//Logger COMMENT OUT LINE BELOW TO DISABLE
app.use(logger);
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//HandleBars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/api/missions", require("./routes/api/missions"));

//HOMEPAGE ROUTE
app.get("/", (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.render("missions", {
    title: "Mission App",
    missions: missions
  })
);
//QUEST ROUTE
app.get("/", (req, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.render("quests", {
    title: "Mission Quests",
    quests: quests
  })
);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
