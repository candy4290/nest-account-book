import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BillModule } from './bill/bill.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {
}
