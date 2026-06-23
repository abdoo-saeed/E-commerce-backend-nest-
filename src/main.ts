import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new SanitizeUsernamePipe());
  await app.listen(process.env.PORT ?? 5000, () => {
    console.log(`Applicatopn is running http://127.0.0.1:${process.env.PORT}`);
  });
}
bootstrap();
