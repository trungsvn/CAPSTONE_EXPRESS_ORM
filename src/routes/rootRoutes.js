import express from 'express';
import useRoutes from './userRoutes.js';
import imageRoutes from './imageRoutes.js';

const rootRoutes = express.Router();
rootRoutes.use("/user", useRoutes);
rootRoutes.use("/images", imageRoutes)

export default rootRoutes;