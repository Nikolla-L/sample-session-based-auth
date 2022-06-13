import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

// @ApiTags('test')
@Controller()
export class AppController {

    constructor(private appService: AppService) { }
    
    // @Get()
    // getHell() {
    //     return this.appService.getHello();
    // }
}