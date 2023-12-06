import jwt from 'jsonwebtoken';

const createToken = (data) => {
    let token = jwt.sign({data}, "capstone_express_orm", {expiresIn: "5y"})

    return token;
}

const checkToken = (token) => {
    console.log("zxc")
    return jwt.verify(token, "capstone_express_orm");
}

const decodeToken = (token) => {
    return jwt.decode(token, "capstone_express_orm")
}

const khoaApi = (req, res, next) =>{
    let {token} = req.headers;
    console.log("token",  token)
    if (token){
        // kiểm tra token hợp lệ
        if(checkToken(token)){
            // let decodeToken = decodeToken(token);
            console.log(token)
        } else {
            res.status(401).send("Token không hợp lệ")
        }

        next(); // bypass   
    } else {
        res.status(401).send("không có quyền truy cập")
    }
}

export {
    createToken,
    checkToken,
    decodeToken,
    khoaApi
}