import { Injectable } from '@nestjs/common';
import { MongoDbConnection } from '../lib/database/connection';
import { Collections } from '../lib/enums';
import { Patient } from './patient.interface';

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

    async getPatientDetails(id: string) {
        try{
            const patientDetails = await this.getPatient(id);

            let patient : Patient = {
                name : `${patientDetails.name[0].given[0]} ${patientDetails.name[0].given[1]}`,
                gender : patientDetails.gender,
                birthDate : patientDetails.birthDate,
                address : patientDetails.address[0].text,
                city : patientDetails.address[0].city,
                state : patientDetails.address[0].state,
                zipcode : patientDetails.address[0].postalCode,
            }

            return patient;

        }catch(ex){
            return ex;
        }

    }

}
