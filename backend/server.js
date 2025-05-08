const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(morgan("dev"));


const PORT = process.env.PORT || 8070;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connect = mongoose.connection;
connect.once('open', () => {
  console.log('Connected to Database 😎');
});

connect.once('error', (err) => {
  console.log(`Error: ${err}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});




// Routes Path
const UserRoute = require("./routes/userRoutes");

//Akalanka
const scheduleRoute = require("./routes/schedules/scheduleRoute");

// Aashani
const distributeRoute = require("./routes/distributors/distributeRoute");
const stockRoute = require("./routes/distributors/stockRoute");

//udara
const noticeRoute = require("./routes/community/noticeRoute");
const postRoute = require("./routes/community/postRoute");



// Use Routes
app.use("/auth", UserRoute); 

//Akalanka
app.use("/schedule", scheduleRoute);

//Aashani
app.use("/distribute", distributeRoute);

app.use("/stock", stockRoute);

//finance
const financeRoute = require("./routes/finance/financeRoute");
app.use("/finance", financeRoute);

//udara
app.use("/notice", noticeRoute);
app.use("/post", postRoute);



module.exports = app;
