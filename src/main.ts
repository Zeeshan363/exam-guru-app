import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const allowedOrigins = ["*"];
  const config = new DocumentBuilder()
  .setTitle('Priksha Guru ')
  .setDescription('The Priksha Guru API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }

  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
