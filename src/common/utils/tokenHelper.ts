import { sign, verify, decode } from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { tokenConfig } from '../enums/token.enum';

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
        if (!token) {
            return false;
        }
        try {
            verify(token, tokenConfig.TOKEN_SECRET);
        } catch (error) {
            return false;
        }
        return true;
    }
}
