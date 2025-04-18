import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.enableCors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
