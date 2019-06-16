export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = '000000', // 成功

    USER_NAME_INVALID = '100001', // 用户名无效
    USER_PSW_INVALID = '100002', // 密码无效
    USER_NOT_VALID = '100003', // 用户名或者密码错误

    CONSUME_DATE_INVALID = '100006', // 消费日期无效
    CONSUME_TYPE_INVALID = '100007', // 消费类型无效
    CONSUME_MONEY_INVALID = '100008', // 消费金额无效

    USER_NOT_LOGIN = '100004', // 用户未登录
    TOKEN_INVALID = '100005', // 令牌无效
}
