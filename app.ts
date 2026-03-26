import express from "express";
import type { Response, Request, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import indexRouter from "./routes/indexRoutes.ts";

//Initialize the express app:
const app = express();

//Use the cors middleware:
app.use(cors());

//Used to parse the incoming form data into req.body:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

//app is running on given Port :
app.listen(process.env.PORT, () => {
        console.log(`Listening on PORT ${process.env.PORT}`);
})
