import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/intercepter/transform.intercepter';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://kchat-app.netlify.app/'],
  });
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
  await app.listen(process.env.PORT ?? 8080, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
