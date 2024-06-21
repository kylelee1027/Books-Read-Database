import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing body request
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Hello world");
});
// Routes for /books url
app.use("/books", booksRoutes);

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log("Successfully connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`App is listening from port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
