"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const songs_module_1 = require("./songs/songs.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const dev_config_service_1 = require("./provider/dev-config-service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const playlists_module_1 = require("./playlists/playlists.module");
const artist_module_1 = require("./artist/artist.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const role_guard_1 = require("./role/role.guard");
const auth_guard_1 = require("./auth/auth.guard");
const casl_module_1 = require("./casl/casl.module");
const database_source_1 = require("./database/database-source");
const config_1 = require("@nestjs/config");
const configurations_1 = require("./config/configurations");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
        console.log('check', dataSource.driver.database);
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('songs');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.development', '.env.production'],
                isGlobal: true,
                load: [configurations_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync(database_source_1.typeOrmAsyncConfig),
            songs_module_1.SongsModule,
            playlists_module_1.PlaylistsModule,
            artist_module_1.ArtistModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            casl_module_1.CaslModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'APP_GUARD',
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: 'APP_GUARD',
                useClass: role_guard_1.RolesGuard,
            },
            {
                provide: dev_config_service_1.DevConfigService,
                useClass: dev_config_service_1.DevConfigService,
            },
            {
                provide: 'CONFIG',
                useValue: true ? 'value1' : 'value2',
            },
        ],
        exports: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map