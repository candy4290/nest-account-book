import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as USER } from './entities/user.entity';
import { Bill as BILL } from './entities/bill.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([USER, BILL]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
