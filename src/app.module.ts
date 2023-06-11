import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [SpaceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
