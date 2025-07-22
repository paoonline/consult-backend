import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './services/Logger/logger.service';
import { LoggingInterceptor } from './services/Interceptors/logging.interceptor';
// import { AuthMiddleware } from './validate/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // ✅ สำคัญใน production
  });
  const logger = app.get(AppLogger);
  // app.enableCors();

  app.enableCors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://consult-frontend.vercel.app/',
    ], // your frontend
    credentials: true,
  });
  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   credentials: true,
  // });
  // app.use(AuthMiddleware); // Apply middleware globally

  // uncomment for used the prefix api
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useLogger(app.get(AppLogger));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
