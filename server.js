const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const api = require("./routes/api")
const db = require('./config/database').MongoURI

const PORT = process.env.PORT || 8000;


mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Mongoose Connected...'))
    .catch(err => console.log(err))


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

if (process.env.NODE_ENV === "production")
    app.use(express.static(path.join(__dirname, "public")));


app.use("/api", api);

app.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, "public/exercise.html")));

app.get("/stats", (req, res) => res.sendFile(path.join(__dirname, "public/stats.html")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(8000, () => console.log("Server started on port 8000"));