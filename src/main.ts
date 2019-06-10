import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filers/http-exception.filter';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  await app.listen(8080);
}
bootstrap();
