import {Controller, Get} from '@nestjs/common';
import {MasterService} from '../../application/service/master.service';

@Controller('v1/tenants')
export class MastersController {
  constructor(private readonly masterService: MasterService) {}

  @Get()
  getYears(): string {
    return this.masterService.getHello();
  }

  getMonths(): string {
    return this.masterService.getHello();
  }

}
