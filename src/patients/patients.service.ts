import { Injectable } from '@nestjs/common';
import { MongoDbConnection } from '../lib/database/connection';
import { Collections } from '../lib/enums';

@Injectable()
export class PatientsService {
    
    private connection : MongoDbConnection;

    constructor(mongoDbConnection: MongoDbConnection) {
        this.connection = mongoDbConnection;
    }

    async getPatient(id: string) {
        try{
            const patients = 
                await  this.connection.collection(Collections.PATIENTS)
                .findOne({ '_id' : this.connection.ObjectId(id) });

            return patients;

        }catch(ex){
            return ex;
        }

    }

}
