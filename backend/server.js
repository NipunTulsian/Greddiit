const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.port || 8000
const connectDB = require("./config/db.js");
const passport = require("passport");
const passport_setup = require("./model/passport.js");
const session = require("express-session");
const authRoute = require("./routes/auth.js")
connectDB();
const app = express();

app.use(session({
    secret: "super secret key",
    resave: false,
    saveUninitialized: false  ,
}));

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.use("/auth", authRoute);

app.use("/user", require("./routes/userroutes.js"));

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})

