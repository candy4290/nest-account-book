declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filers/http-exception.filter';
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';
import { logger } from './common/middleware/logger.middleware';
// import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('account');
  app.enableCors({
    exposedHeaders: 'access-token', // 相当于设置header头Access-Control-Expose-Headers，以便客户端可以取到response header中的access-token
  });
  app.use(logger);
  // app.use(helmet());
  // app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(compression());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8080);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
