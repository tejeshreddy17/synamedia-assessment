import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { AppointmentModule } from "./appointment/appointment.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
    }),

    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
