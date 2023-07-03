import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { json } from "express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(json({ limit: '60mb' }));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentación Historias Clinicas')
    .setDescription('Documentación Historias Clinicas')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc/', app, document);
  await app
    .listen(process.env.GATEWAY_PORT)
    .then(() =>
      console.log(
        `API Run at http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`,
      ),
    );
}
bootstrap().then();
