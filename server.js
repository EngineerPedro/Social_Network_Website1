const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to database
connectDB();

//INIT middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Operational"));

//Defined Routes
app.use("/API/user", require("./routes/API/user"));
app.use("/API/auth", require("./routes/API/auth"));
app.use("/API/profile", require("./routes/API/profile"));
app.use("/API/posts", require("./routes/API/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever operating on port ${PORT}`));
