const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const verify = require("./utils/pan_api");

const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
app.set("view engine", "hbs");

const hbs = require("hbs");
const { query } = require("express");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicPath));

hbs.registerPartials(partialsPath);

app.get("/verify", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a PAN number!",
    });
  }
  verify(
    req.query.search,
    (
      error,
      { seed_status, f_name, l_name, m_name, card_name, p_number } = {}
    ) => {
      if (error) {
        return res.send({ error: "Invalid PAN, please try again!" });
      }

      res.send({ seed_status, f_name, l_name, m_name, card_name, p_number });
    }
  );
});

app.get("", (req, res) => {
  res.render("index", {
    title: "PAN Verification Portal",
    name: "Sarthak",
  });
});

app.set("views", viewsPath);

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About this site",
    name: "Sarthak",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "Error 404",
    errorMessage: "Page not Found",
    name: "Sarthak",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port + ". ");
});
