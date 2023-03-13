import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "../entities/Post"
import { User } from '../entities/User'
// import { Follow } from "../entities/Follow"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306, 
    username: "root",
    password: "mpl08092002",
    database: "thuc_tap_co_so",
    synchronize: true,
    logging: false,
    entities: [User, Post]
})

