import express from "express";
import sequelize from "./src/models/connect.js";
import useRoutes from "./src/routes/userRoutes.js";
import imageRoutes from "./src/routes/imageRoutes.js";

const app = express();
app.use(express.json());
app.use(useRoutes);
app.use(imageRoutes)

app.listen(8080);