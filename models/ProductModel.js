import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    kategori :{
        type : DataTypes.STRING,
        defaultValue : "makanan"
    }
}, {
    freezeTableName: true
});

export default Product;
