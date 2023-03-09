const express = require('express');
const app = express();
const session = require("express-session");

const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

const exphbs = require('express-handlebars');
const allRoutes = require("./controllers");



const PORT = process.env.PORT || 3001;


const SequelizeStore = require("connect-session-sequelize")(session.Store)
const sess = {
    secret: process.env.SECRET,
    cookie: {maxAge: 1000*60*60*2, },
    allsave: false,
    saveUninitialize: true,
    store: new SequelizeStore({db: sequelize})
}
app.use(session(sess))

app.use(express.json());
app.use(express.static("public"));
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use("/", allRoutes);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});