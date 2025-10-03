import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // strip unknown props
      forbidNonWhitelisted: true,   // 400 on extra props
      transform: true,              // auto-cast primitives
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(Number(process.env.PORT ?? 3000));
}
bootstrap();
