const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Operational"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sever operating on port ${PORT}`));
