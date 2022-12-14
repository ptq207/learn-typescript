import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import configuration from './config/config';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule,
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
