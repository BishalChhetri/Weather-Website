const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { request } = require("http");

const geocode = require("./utilis/geocode.js");
const forecast = require("./utilis/forecast.js");

const app = express();

// Defined Path
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Bishal KC",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Bishal KC",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Bishal KC",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bishal KC",
    errorMessage: "Help Article not found",
  });
});
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "bishal",
//       age: 22,
//     },
//     {
//       name: "sarah",
//       age: 19,
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About information.</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.search,
      });
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    prodcut: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bishal KC",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
