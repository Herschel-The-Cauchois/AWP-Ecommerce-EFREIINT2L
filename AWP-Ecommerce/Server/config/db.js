module.exports = {
        HOST: "mysql.agh.edu.pl",
        USER: "lesterli",
        PASSWORD: "ZNSm4NbtWo0bbo5t",
        DB: "lesterli",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
}