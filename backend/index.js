const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");
const app = express();

// Middlewares for routing, cors and JSON parsing
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
})

