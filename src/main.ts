import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/intercepter/transform.intercepter';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('Telegram Service')
    .setDescription('The Telegram API description')
    .setVersion('1.0')
    .addTag('telegram')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
