import express from "express";
import bodyParser from "body-parser";

import apiRoute from "./src/routes/index.route.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", apiRoute)

app.listen(PORT, () => {
    console.log(`Run now!!! PORT ${PORT}`);
}); 