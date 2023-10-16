import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const httpService = new HttpService();
  httpService.axiosRef.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('Internal server error exception', error);
      throw new InternalServerErrorException();
    },
  );

  await app.listen(3001);
}
bootstrap();
