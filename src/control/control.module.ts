import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';

@Module({
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
