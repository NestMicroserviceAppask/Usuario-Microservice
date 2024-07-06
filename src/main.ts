import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('UsuarioRunMain');
  
  // Crear la aplicación microservicio
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: envs.port,
    },
  });

  // Configurar ValidationPipe global en AppModule
  const appHttp = await NestFactory.create(AppModule);
  appHttp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Iniciar el microservicio
  await app.listen();
  
  logger.log(`Usuario Microservice running on port ${envs.port}`);
}

bootstrap();
