import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthMiddleware } from './validate/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(AuthMiddleware); // Apply middleware globally

  // uncomment for used the prefix api
  // app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
