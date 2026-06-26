import 'dotenv/config';
import express  from "express";

import cors     from "cors";

import ProvinceRouter from "./src/controllers/province-controller.js"


const app  = express();

const port = 3000;

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.use("/provincia", ProvinceRouter);

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

})