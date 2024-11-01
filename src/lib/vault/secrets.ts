import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Vault } from '../enums';

@Injectable()
export class Secrets {

    public dbUrl : string;
    public dbName : string;

    constructor() {
    }

    public async get() {
        try {
            
            const HCP_CLIENT_ID:  any = process.env['HCP_CLIENT_ID'];
            const HCP_CLIENT_SECRET:  any = process.env['HCP_CLIENT_SECRET'];

            const tokenResponse = await axios.post(
                'https://auth.idp.hashicorp.com/oauth2/token',
                new URLSearchParams({
                    "client_id" : HCP_CLIENT_ID,
                    "client_secret": HCP_CLIENT_SECRET,
                    "grant_type" : 'client_credentials',
                    "audience" : 'https://api.hashicorp.cloud'
                })
            );

            const vaultResponse = await axios.get('https://api.cloud.hashicorp.com/secrets/2023-11-28/organizations/470bc960-ae95-431e-bc42-2b530bd96e29/projects/1392c9f6-4b02-4108-b4fb-6f1fdf29f1e3/apps/patients/secrets:open', {
                headers: {
                  'Authorization': 'Bearer ' + tokenResponse.data.access_token
                }
            });

            vaultResponse.data.secrets.forEach( (e: any) => {
                switch(e.name) {
                    case Vault.URI:
                        this.dbUrl = e.static_version.value;
                      break;
                    case Vault.DBNAME:
                        this.dbName = e.static_version.value;
                      break;                      
                }
            });

        }catch(ex){
            return ex;
        }

    }

}