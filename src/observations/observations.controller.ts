import { Controller, Get, Req, Param } from '@nestjs/common';
import { ObservationsService } from './observations.service'; 

@Controller('api/observations')
export class ObservationsController {

    constructor(private readonly ObservationsService: ObservationsService) {}

    @Get(':patientId')
    getObservations(@Req() request: Request, @Param() params: any): object {
        return this.ObservationsService.getObservations(params.patientId);
    }

    @Get(':patientId/:appointmentId')
    getObservation(@Req() request: Request, @Param() params: any): object {
        return this.ObservationsService.getObservation(params.patientId, params.appointmentId);
    }
}
