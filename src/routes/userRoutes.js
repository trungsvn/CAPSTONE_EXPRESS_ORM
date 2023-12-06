import express from 'express';
import { getListuser, login, signUp, updateUser, uploadAvatar } from '../controllers/userControllers.js';
import { upload } from '../controllers/uploadController.js';
import { khoaApi } from '../config/jwt.js';

const useRoutes = express.Router();
useRoutes.post("/login", login);
useRoutes.post("/sign-up", signUp);
useRoutes.get("/getListuser", getListuser);

useRoutes.post("/upload", upload.single("file"), uploadAvatar);
useRoutes.put("/update_user", khoaApi, updateUser);

export default useRoutes;
