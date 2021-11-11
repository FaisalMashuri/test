// const express = require('express')
// const mysql = require('mysql2');

// const mysqlConfig = {
//   host: "mysql_server",
//   user: "dan",
//   password: "secret",
//   database: "test_db"
// }

// let con = null

// const app = express()

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.get('/connect', function (req, res) {
//   con =  mysql.createConnection(mysqlConfig);
//   con.connect(function(err) {
//     if (err) throw err;
//     res.send('connected')
//   });
// })

// app.get('/create-table', function (req, res) {
//   con.connect(function(err) {
//     if (err) throw err;
//     const sql = `
//     CREATE TABLE IF NOT EXISTS numbers (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       number INT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )  ENGINE=INNODB;
//   `;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       res.send("numbers table created");
//     });
//   });
// })

// app.get('/insert', function (req, res) {
//   const number = Math.round(Math.random() * 100)
//   con.connect(function(err) {
//     if (err) throw err;
//     const sql = `INSERT INTO numbers (number) VALUES (${number})`
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       res.send(`${number} inserted into table`)
//     });
//   })
// })

// app.get('/fetch', function (req, res) {
//   con.connect(function(err) {
//     if (err) throw err;
//     const sql = `SELECT * FROM numbers`
//     con.query(sql, function (err, result, fields) {
//       if (err) throw err;
//       res.send(JSON.stringify(result))
//     });
//   });
// })

// app.listen(3000)

// console.log("listening on port 3000")


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