import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerUIModules } from "./api-docs-index/swagger-ui-modules";
import { TypeORMErrorFilter } from "./common/typeorm-error-filter";
import { CatchAllErrorsFilter } from "./common/catch-all-errors.filter";
import { initializeTransactionalContext } from "typeorm-transactional";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import * as dotenv from "dotenv";
import { AppointmentModule } from "./appointment/appointment.module";

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  setupSwaggerUI(app);

  app.useGlobalFilters(new TypeORMErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CatchAllErrorsFilter());

  await app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on ${process.env.SERVER_PORT}`);
  });

  function setupSwaggerUI(app: INestApplication) {
    setupSwaggerUIForModule(app, "appointments", AppointmentModule);
  }

  function setupSwaggerUIForModule(
    app: INestApplication,
    name: string,
    module: any
  ) {
    const options = new DocumentBuilder()
      .setTitle(`${name} module`)
      .setDescription(`REST API for ${name} module`)
      .setVersion("3.0")
      .addTag(name)
      // .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options, {
      include: [module],
    });
    SwaggerModule.setup(`api-docs/${name}`, app, document);
    SwaggerUIModules.push(name);
  }
}
bootstrap();
