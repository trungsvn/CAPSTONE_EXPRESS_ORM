import express from 'express';
import { deleteimage, getComment_id, getInfo_image, getListcreated_image_as_userid,getListimages, getListimages_name, getListsaved_image_as_userid, isImagesave, saveComment } from '../controllers/imageControllers.js';

const imageRoutes = express.Router();

imageRoutes.get("/getListimages", getListimages);
imageRoutes.get("/getListimage_name/:image_name", getListimages_name);
imageRoutes.get("/getInfo_image/:image_id", getInfo_image);
imageRoutes.get("/getComment_id/:image_id", getComment_id);
imageRoutes.get("/isImagesave/:image_id", isImagesave);
imageRoutes.post("/saveComment", saveComment);
imageRoutes.get("/getListimage_as_userid/:user_id", getListcreated_image_as_userid);
imageRoutes.get("/getListimage_saved_as_userid/:user_id", getListsaved_image_as_userid);
imageRoutes.delete("/deleteimage/:image_id", deleteimage);
export default imageRoutes;