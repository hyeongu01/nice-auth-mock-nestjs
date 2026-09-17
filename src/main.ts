import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  const documentBuilder = new DocumentBuilder()
    .setTitle('Nice Mock-up Auth Server')
    .setDescription('Nice 인증서버 목업 서버')
    .setVersion(`${process.env.APP_VERSION || '0.0.1'}`)
    .addBearerAuth();
  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, { jsonDocumentUrl: 'docs' });

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
