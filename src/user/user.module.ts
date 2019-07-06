import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as USER } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([USER]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
