const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Discord bot is running");
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Fake web server running on port 10000");
});
