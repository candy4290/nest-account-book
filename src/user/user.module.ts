import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as USER } from './user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([USER]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
