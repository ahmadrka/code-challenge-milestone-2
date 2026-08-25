import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [AuthModule, UsersModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
