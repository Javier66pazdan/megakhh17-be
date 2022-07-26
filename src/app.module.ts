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
import { StudentsHrsModule } from './students_hrs/students_hrs.module';
import { StudentsUrlsModule } from './students_urls/students_urls.module';
import { ExpectedTypeWorkModule } from './expected_type_work/expected_type_work.module';
import { ExpectedContractTypeModule } from './expected_contract_type/expected_contract_type.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ["./dist/**/*.entity{.ts,.js}"],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    AuthModule, UserModule, StudentsModule, HrsModule, RoleModule, StudentsProfileModule, StudentsHrsModule, StudentsUrlsModule, ExpectedTypeWorkModule, ExpectedContractTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
