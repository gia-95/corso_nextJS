import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); // Middleware per cookie (non importazione normale per settaggi particoalri)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdf'], // usata per criptare le info nel cookie
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina attributi del payload che arriva che non sono presenti nella Dto
    }),
  );
  await app.listen(3000);
}
bootstrap();
