import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private config;
    constructor(appService: AppService, config: any);
    getHello(): string;
}
