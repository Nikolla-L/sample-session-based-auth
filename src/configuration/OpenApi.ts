import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';

export const InitOpenApi = (app: INestApplication) => {
	const config = new DocumentBuilder()
			.setTitle('Sample API')
			.setDescription('Session based auth')
			.setVersion('1.0')
			// .addBearerAuth()
			.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'Sample API'
    });
};
