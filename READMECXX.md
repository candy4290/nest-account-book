### 使用的依赖包
class-transformer - 将对象转为声明的class类
class-validator - 验证一个class类中的字段是否有效

### 执行顺序
客户端请求 ---> 中间件 ---> 守卫 ---> 拦截器之前 ---> 管道 ---> 控制器处理并响应 ---> 拦截器之后 ---> 过滤器

### 数据库表备份
mysqldump -u root -p account > account_backup.sql