import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js"
import cors from "cors";
// import models from "./models";

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json())
    .use(cors())
    .use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});