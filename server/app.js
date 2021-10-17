var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//Connection to DB
mongoose.connect('mongodb+srv://IsraelaZimru:2DFOudU8lkOZ4uC9@fullstackprojects.epp4t.mongodb.net/websocket',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch(err => console.log(err));



//connecting to Socket.io
var sockIO = require('socket.io')();
app.sockIO = sockIO;


sockIO.on('connection', socket => {
    console.log(`A client connection occurred!. id= ${socket.id}`);

    socket.on("disconnect", () => console.log(`a user disconnect!`))
});

app.use(function (req, res, next) {
    res.io = sockIO;
    next();
});


app.use(cors({
    origin: "http://localhost:3000",
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
