import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserDto } from './dots/user-login.dto';

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
    }

    @Post('/login')
    login(@Res() response: Response,  @Body() user: UserDto ) {
        console.log('login');
        this.user.login(user).then(rsp => {
            console.log('------');
            console.log(rsp);
            if (rsp) {
                response.status(HttpStatus.OK).json({aa: '登录成功！'});
            }
        });
    }
}
