import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitOpenApi } from './configuration/OpenApi';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }]
  });

  app.enableCors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
  });
  
  app.use(
    session({
      secret: 'something',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  
  InitOpenApi(app);

  await app.listen(parseInt(process.env.PORT) || 3001);
}
bootstrap();
