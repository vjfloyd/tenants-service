import {Injectable} from '@nestjs/common';

@Injectable()
export class MasterService {
  getHello(): string {
    return 'Hello World!';
  }
}
