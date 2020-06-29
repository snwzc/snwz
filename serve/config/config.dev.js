/*
 * @Author: wl
 * @Date: 2020-06-13 15:03:38
 * @LastEditTime: 2020-06-13 18:32:54
 */

module.exports = {
    sequezlie: {
        database: 'mydb',
        username: 'root',
        password: 'weilai0921',
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