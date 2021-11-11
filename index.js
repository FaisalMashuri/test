
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const upload = multer();


// Models
const db = require("./app/models");

const app = express();

let whiteList = ['http://localhost:8081'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors(corsOptions));
app.use('/uploads', express.static('./uploads'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header(
  "Access-Control-Allow-Headers",
  "x-access-token, Origin, Content-Type, Accept"
  );
  next()
})

// Sync database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to IDStack REST API." });
});

// Posts Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/product.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});