import { Controller, Get, Req, Param} from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('api/patients')
export class PatientsController {

    constructor(private readonly PatientsService: PatientsService) {}

    @Get(':id')
    getPatient(@Req() request: Request, @Param() params: any): object {
        return this.PatientsService.getPatient(params.id);
    }


}