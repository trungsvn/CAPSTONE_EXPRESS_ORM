import { Sequelize } from "sequelize";

// tạo môi trường để  lưu những thông tin của BE
import config from '../config/config.js'

const sequelize = new Sequelize(config.databaseName, config.databaseUserName, config.databasePassword, {
    port: config.databasePort,
    dialect: "mysql",
    host: config.databaseHost
});

export default sequelize;

//kiểm tra kết nối
const checkConnect =async () => {
    try {
        await sequelize.authenticate();
        console.log("kết nối thành công");
    } catch (error){
        console.log("kết nối thất bại");
    }
};
checkConnect();


