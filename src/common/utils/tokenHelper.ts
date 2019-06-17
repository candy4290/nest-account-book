import { sign, verify, decode } from 'jsonwebtoken';
import { tokenConfig } from '../enums/token.enum';
import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import { ApiException } from '../exceptions/api.exception';

export class TokenUtils {
    /**
     *
     * 生成token
     * @param {{id: number, userName: string}} payload
     * @memberof TokenUtils
     */
    static generateToken(payload: {id: number, userName: string}): string {
        const token = sign(payload, tokenConfig.TOKEN_SECRET, {
            expiresIn: tokenConfig.TOKEN_VALIDITY,
        });
        return  token;
    }

    /**
     *
     * token解析
     * @static
     * @param {string} token
     * @memberof TokenUtils
     */
    static parseToken(token: string) {
        return decode(token);
    }

    /**
     *
     * 刷新token过期时间（重新签发token）
     * @param {string} token
     * @memberof TokenUtils
     */
    static refreshToken(token: string): string {
        if (!token || token === 'null' || token === 'undefined') {
            return null;
        }
        const payload = this.parseToken(token);
        return this.generateToken({id: payload['id'], userName: payload['userName']});
    }

    /**
     *
     * 验证token是否有效，过期（退出登录后之前的token也认为过期）
     * @param {string} token
     * @memberof TokenUtils
     */
    static verifyToken(token: string): boolean {
        if (!token || token === 'null' || token === 'undefined') {
            throw new ApiException('用户未登录！', ApiErrorCode.USER_NOT_LOGIN, HttpStatus.OK);
        }
        try {
            verify(token, tokenConfig.TOKEN_SECRET);
        } catch (error) {
            throw new ApiException('令牌无效！', ApiErrorCode.TOKEN_INVALID, HttpStatus.OK);
        }
        return true;
    }
}
