import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  //new port
  console.log('DB_HOST:', process.env.DATABASE_HOST); // Reemplaza 'DB_HOST' con el nombre de tu variable
  console.log('DB_PORT:', process.env.DATABASE_PORT); // db
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
