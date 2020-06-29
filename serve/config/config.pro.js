/*
 * @Author: wl
 * @Date: 2020-06-13 15:03:46
 * @LastEditTime: 2020-06-13 18:15:38
 */
module.exports = {
    sequezlie: {
        database: 'mydb',
        username: 'root',
        password: 'Weilai0921',
        host: 'localhost',
        dialect: 'mysql',
        // 时区
        timezone: '+08:00',
        // 时间格式化添加这个配置 
        dialectOptions: {
            dateStrings: true,
            typeCast: true
        }
    }
}