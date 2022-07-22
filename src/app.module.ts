import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { StudentsModule } from './students/students.module';
import { HrsModule } from './hrs/hrs.module';
import { RoleModule } from './role/role.module';
import { StudentsProfileModule } from './students_profile/students_profile.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    AuthModule, UserModule, StudentsModule, HrsModule, RoleModule, StudentsProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
