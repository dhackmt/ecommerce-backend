import {Sequelize} from "sequelize";

const sequelize=new Sequelize({
    username: 'postgres',
    host: 'localhost',
    database: "ecommerce",
    password: "root",
    port: 5432,
    dialect: "postgres",
}) 

export default sequelize;