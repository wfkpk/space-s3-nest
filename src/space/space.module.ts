import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
