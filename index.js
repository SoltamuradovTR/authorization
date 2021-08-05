require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const cors = require('cors')

const app = express();



app.use(express.json())
app.use(require('./routes/users.route'))
app.use(require('./routes/todo.route'))
app.use(express.urlencoded({extended: true}))
app.use(cors)
app.use(morgan('dev'))


const connectServAndDB = async () => {
  const { PORT, MONGO } = process.env;
  await mongoose.connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(PORT, () => {
    console.log('Успешное подключение')
  });
};

connectServAndDB();
