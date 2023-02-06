require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// Body parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const urls = {};
let counter = 1;

app.post("/api/shorturl", (req, res) => {
  const { url } = req.body;

  if (!url.startsWith("https://")) {
    res.json({ error: "invalid url" });
  }

  urls[counter] = { original_url: url, short_url: counter };
  res.json({ original_url: url, short_url: counter });
  counter++;
});

app.get("/api/shorturl/:urlId", (req, res) => {
  const { urlId } = req.params;
  res.redirect(urls[urlId].original_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
