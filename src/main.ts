import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filers/http-exception.filter';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { logger } from './common/middleware/logger.middleware';
// import { AuthGuard } from './common/guards/auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('account');
  app.enableCors({
    exposedHeaders: 'access-token', // 相当于设置header头Access-Control-Expose-Headers，以便客户端可以取到response header中的access-token
  });
  app.use(logger);
  // app.useGlobalGuards(new AuthGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8080);
}
bootstrap();
