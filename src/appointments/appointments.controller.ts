import { Controller, Get, Req, Param } from '@nestjs/common';
import { AppointmentsService }  from './appointments.service';

@Controller('api/appointments')
export class AppointmentsController {

    constructor(private readonly AppointmentsService: AppointmentsService) {}

    @Get(':patientId')
    getAppointments(@Req() request: Request, @Param() params: any): object {
        return this.AppointmentsService.getAppointments(params.patientId);
    }

    @Get(':patientId/:appointmentId')
    getAppointment(@Req() request: Request, @Param() params: any): object {
        return this.AppointmentsService.getAppointment(params.patientId, params.appointmentId);
    }

}
