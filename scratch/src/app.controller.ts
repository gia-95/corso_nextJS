import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
    @Get()
    getRootRoute() {
        return 'testo di prova!';
    }
    
    @Get('bye')
    getByeThere() {
        return 'bye there!';
    }
}
