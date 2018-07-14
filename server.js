const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const notifications = require("./routes/api/notifications");
const masters = require("./routes/api/masters");
const projects = require("./routes/api/projects");
const profile = require("./routes/api/profile");
const members = require("./routes/api/members");
const posts = require("./routes/api/posts");
const discussions = require("./routes/api/discussions");
const passport = require("passport");
const path = require('path');

mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./config/passport')(passport);

//routes
app.use(express.static('public'))
app.use('/api/users',users);
app.use('/api/profiles',profile);
app.use('/api/posts',posts);
app.use('/api/masters',masters);
app.use('/api/projects',projects);
app.use('/api/discussions',discussions);
app.use('/api/members',members);
app.use('/api/notifications',notifications);

//static asset saat produksi

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running on port "+port));