import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
const model = initModels(sequelize);
// GET danh sách ảnh về
const getListimages = async (req, res) => {
    let data = await model.hinh_anh.findAll();
    res.send(data)
}
// Tìm kiếm danh sách ảnh theo tên
const getListimages_name = async (req, res) => {
    let { image_name } = req.params;

    let checkimage = await model.hinh_anh.findOne({
        where: {
            ten_hinh: image_name
        }
    });

    if (checkimage) {
        let data = await model.hinh_anh.findOne(
            {
                where: {
                    ten_hinh: image_name
                }
            }
        );
        res.send(data);
    } else res.send("Tên hình không tồn tại")

}
// GET thông tin ảnh và người tạo ảnh theo id ảnh
const getInfo_image = async (req, res) => {
    let { image_id } = req.params;
    let checkimage_id = await model.hinh_anh.findOne({
        where: {
            hinh_id: image_id
        }
    });

    if (checkimage_id) {
        let imagedata = await model.hinh_anh.findOne(
            {
                where: {
                    hinh_id: image_id
                }
            }
        );
        let user_id = imagedata.nguoi_dung_id;

        let userdata = await model.nguoi_dung.findOne(
            {
                where: {
                    nguoi_dung_id: user_id
                }
            }
        );

        let info_image = {
            user: userdata,
            image: imagedata,

        }
        res.send(info_image);
    } else
        res.send("Không tồn tại hình ảnh")
}
//GET thông tin bình luận theo id ảnh
const getComment_id = async (req, res) => {
    let { image_id } = req.params;
    let checkimage_id = await model.binh_luan.findOne({
        where: {
            hinh_id: image_id
        }
    });

    if (checkimage_id) {
        let comment = checkimage_id.noi_dung
        res.send(`Thông tin bình luận của ID ảnh ${image_id} là  ${comment}`)
    } else
        res.send("Không có thông tin ảnh")
}
//GET thông tin đã lưu hình này chưa theo id ảnh (dùng để kiểm tra ảnh đã lưu chưa ở nút save)
const isImagesave = async (req, res) => {
    let { image_id } = req.params;
    let checkimage_id = await model.hinh_anh.findOne({
        where: {
            hinh_id: image_id
        }
    });

    if (checkimage_id) {
        res.send(`ID ảnh ${image_id} đã được lưu`)
    } else
        res.send("Hình chưa được lưu")
}
//POST để lưu thông tin bình luận của người dùng với ảnh
const saveComment = async (req, res) => {
    let { nguoi_dung_id, hinh_id, noi_dung } = req.body;
    console.log(nguoi_dung_id, hinh_id, noi_dung);
    let checkuser = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id,
        }
    });
    let checkimage = await model.hinh_anh.findOne({
        where: {
            hinh_id,
        }
    });
    if (checkuser) {
        if (checkimage) {
            let newComment = {
                nguoi_dung_id,
                hinh_id,
                noi_dung,
                ngay_binh_luan: Date(),
                // role: "user"
            }

            let result = await model.binh_luan.create(newComment);
            res.status(201).send("Thêm bình luận thành công")
            return

        } else
            res.send(`Không tồn tại ID ảnh ${hinh_id} trong dữ liệu`)
    } else
        res.send(`Không tồn tại người dùng có ID ${nguoi_dung_id} trong dữ liệu `)

}
//GET danh sách ảnh đã tạo theo user id
const getListcreated_image_as_userid = async (req, res) => {
    let { user_id } = req.params;
    let checkuser_id = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: user_id
        }
    });

    if (checkuser_id) {
        let data = await model.hinh_anh.findAll({
            where: {
                nguoi_dung_id: user_id
            }
        });
        let userimagedata = { data }
        res.send(userimagedata)
    } else
        res.send(`Không tồn tại người dùng với ID ${user_id}`)
}
//GET danh sách ảnh đã lưu theo user id
const getListsaved_image_as_userid = async (req, res) => {
    let { user_id } = req.params;
    let checkuser_id = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: user_id
        }
    });

    if (checkuser_id) {
        let data = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id: user_id
            }
        });
        let userimagesaveddata = { data }
        res.send(userimagesaveddata)
    } else
        res.send(`Không tồn tại người dùng với ID ${user_id}`)
}
//DELETE xóa ảnh đã tạo theo id ảnh
const deleteimage = async (req, res) => {
    let { image_id } = req.params;
    let checkimage_id = await model.hinh_anh.findOne({
        where: {
            hinh_id: image_id
        }
    });
    if (checkimage_id) {
        await model.luu_anh.destroy({
            where: {
                hinh_id: image_id
            }
        });
        await model.binh_luan.destroy({
            where: {
                hinh_id: image_id
            }
        });
        await model.hinh_anh.destroy({
            where: {
                hinh_id: image_id
            }
        });

        res.send(`Đã xóa thành công hình ảnh với ID ${image_id}`)
    } else
        res.send(`Không tồn tại hình ảnh với ID ${image_id}`)
}




export {
    getListimages,
    getListimages_name,
    getInfo_image,
    getComment_id,
    isImagesave,
    saveComment,
    getListcreated_image_as_userid,
    getListsaved_image_as_userid,
    deleteimage,
}