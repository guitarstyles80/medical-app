import { Injectable } from '@nestjs/common';
// or as an es module:
import { MongoClient, ObjectId } from 'mongodb';
import { Vault } from '../enums';
import { Secrets } from '../vault/secrets';

import axios from 'axios';

@Injectable()
export class MongoDbConnection {

    private client: MongoClient;
    private db: any;
    private secrets : Secrets;

    constructor(secrets: Secrets) {
        this.secrets = secrets;
        this.startConnection();
    }

    private async startConnection() {
        try {
            await this.secrets.get();
            this.client = new MongoClient(this.secrets.dbUrl);
            await this.client.connect();
            await this.client.db(this.secrets.dbName).command({ ping: 1 });
            console.log('Connected successfully to server');
            this.db = this.client.db(this.secrets.dbName);
        }catch(ex){
            this.destroy();
        }

    }

    public ObjectId(id: string){
        return new ObjectId(id);
    }

    public collection (collection: string) {
        return this.db.collection(collection);
    }

    public destroy(){
        this.client.close();
    }
}