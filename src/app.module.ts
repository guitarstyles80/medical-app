import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsController } from './patients/patients.controller';
import { PatientsService } from './patients/patients.service';
import { MongoDbConnection } from './lib/database/connection';
import { Secrets } from './lib/vault/secrets';
import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsService } from './appointments/appointments.service';
import { ObservationsController } from './observations/observations.controller';
import { ObservationsService } from './observations/observations.service';

@Module({
  imports: [],
  controllers: [AppController, PatientsController, AppointmentsController, ObservationsController],
  providers: [AppService, PatientsService, MongoDbConnection, Secrets, AppointmentsService, ObservationsService],
  exports: [MongoDbConnection, Secrets]
})
export class AppModule {}
