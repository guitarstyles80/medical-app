import { Injectable } from '@nestjs/common';
import { MongoDbConnection } from '../lib/database/connection';
import { Collections } from '../lib/enums';

@Injectable()
export class ObservationsService {

    private connection : MongoDbConnection;

    constructor(mongoDbConnection: MongoDbConnection) {
        this.connection = mongoDbConnection;
    }

    async getObservations(patientId: string) {
        try{
            const observations = 
                await this.connection.collection(Collections.OBSERVATIONS)
                .find({ 'patientId' : patientId }).toArray();

            return observations;

        }catch(ex){
            return ex;
        }

    }

    async getObservation(patientId: string, observationId: string) {
        try{
            const observation = 
                await this.connection.collection(Collections.OBSERVATIONS)
                .findOne({ 'patientId' : patientId, '_id' : this.connection.ObjectId(observationId) });

            return observation;

        }catch(ex){
            return ex;
        }

    }

}
