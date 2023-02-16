const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./config/connectDB");
connectDB();

app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  error
    ? console.error(`Failed to connect !!! ${error}`)
    : console.log(`Server is running on port ... ${PORT}`);
});
