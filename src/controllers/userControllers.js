import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import bcrypt from 'bcrypt';
import { createToken, decodeToken } from "../config/jwt.js"
const model = initModels(sequelize);
// đăng nhập
const login = async (req, res) => {
    let { email, password } = req.body;

    let data = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })

    if (data) {
        let checkPassword = bcrypt.compareSync(password, data.password);
        if (checkPassword) {
            let token = createToken(data);
            res.send(token);
            return
        } else {
            res.send("Password không đúng")
            return
        }

    } else {
        res.status(400).send("Email hoặc password không đúng")
    }

}

// đăng ký
const signUp = async (req, res) => {
    let { email, password, ho_ten, tuoi } = req.body;

    let data = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    });

    let hashPassword = bcrypt.hashSync(password, 10)

    if (!data) {
        let newData = {
            ho_ten,
            email,
            password: hashPassword,
            tuoi,
            anh_dai_dien: "",
            role: "user"
        }

        let result = await model.nguoi_dung.create(newData);
        console.log(hashPassword);
        res.status(201).send("Đăng ký thành công")
        return

    } else {
        res.send("Email đã tồn tại")
    }
}
//GET thông tin user
const getListuser = async (req, res) => {
    let userdata = await model.nguoi_dung.findAll();
    res.send(userdata)
}

//POST thêm 1 ảnh của user
import compress_images from 'compress-images'

const uploadAvatar = async (req, res) => {
    let file = req.file;

    compress_images(
        process.cwd() + `/src/images/avatars/${file.filename}`,
        process.cwd() + "/src/images/",
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        {
            gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] }
        },
        function (error, completed, statistic) {
            console.log("-------------");
            console.log(error);
            console.log(completed);
            console.log(statistic);
            console.log("-------------");
        }
    );
    res.send(file)
}

//Chỉnh sửa thông tin cá nhân
// PUT thông tin cá nhân user
const updateUser = async (req, res) => {
    let { email, password, ho_ten, tuoi } = req.body;
    console.log("zxcvcb")
    let { token } = req.headers;

    let decode = decodeToken(token)
    console.log(decode)
    let { nguoi_dung_id } = decode.data;
    let infoUser = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: nguoi_dung_id
        }
    })

    let hashPassword = bcrypt.hashSync(password, 10)

    if (infoUser) {
        // speard operator
        let updateData = {
            ...infoUser,
            email,
            password: hashPassword,
            ho_ten,
            tuoi,
        }

        await model.nguoi_dung.update(updateData, {
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        })

    } else {
        res.send("Không tồn tại user")

    }
    res.send("update thành công");
}
export {
    login,
    signUp,
    getListuser,
    uploadAvatar,
    updateUser,
}