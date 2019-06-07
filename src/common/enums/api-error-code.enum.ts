export enum ApiErrorCode {
    TIMEOUT = -1, // 系统繁忙
    SUCCESS = '000000', // 成功

    USER_NAME_INVALID = '100001', // 用户名无效
    USER_PSW_INVALID = '100002', // 密码无效
    USER_NOT_VALID = '100003', // 用户名或者密码错误
}
