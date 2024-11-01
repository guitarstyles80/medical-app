import { Injectable } from '@nestjs/common';
import { MongoDbConnection } from '../lib/database/connection';
import { Collections } from '../lib/enums';

@Injectable()
export class AppointmentsService {

    private connection : MongoDbConnection;

    constructor(mongoDbConnection: MongoDbConnection) {
        this.connection = mongoDbConnection;
    }

    async getAppointments(patientId: string) {
        try{
            const appointments = 
                await this.connection.collection(Collections.APPOINTMENTS)
                .find({ 'patientId' : patientId }).toArray();

            return appointments;

        }catch(ex){
            return ex;
        }

    }

    getAppointment(patientId: string, appointmentId: string): object {
        try{
            const appointment = 
                this.connection.collection(Collections.APPOINTMENTS)
                .findOne({ 'patientId' : patientId, '_id' :  this.connection.ObjectId(appointmentId) });

            return appointment;

        }catch(ex){
            return ex;
        }

    }

}
