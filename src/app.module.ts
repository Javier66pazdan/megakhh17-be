import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'megakhh17be',
            entities: ["dist/**/**.entity{.ts,.js}"],
            bigNumberStrings: false,
            logging: true,
            synchronize: true,
        }),
        AuthModule, UserModule],
})
export class AppModule {
}
