import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill as BILL } from './entities/bill.entity';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([BILL]),
    ],
    providers: [BillService],
    controllers: [BillController],
})
export class BillModule {}
