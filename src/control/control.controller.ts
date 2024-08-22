import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ControlService } from './control.service';
import { CreateControlDto } from './dto/create-control.dto';
import { UpdateControlDto } from './dto/update-control.dto';
import {
  Resource,
  Roles,
  Scopes,
  Public,
  RoleMatchingMode,
} from 'nest-keycloak-connect';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  @Roles({ roles: ['admin'] })
  create(@Body() createControlDto: CreateControlDto) {
    return this.controlService.create(createControlDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.controlService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['user'] })
  findOne(@Param('id') id: string) {
    return this.controlService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['user'] })
  update(@Param('id') id: string, @Body() updateControlDto: UpdateControlDto) {
    return this.controlService.update(+id, updateControlDto);
  }

  @Delete(':id')
  @Roles({ roles: ['admin'] })
  remove(@Param('id') id: string) {
    return this.controlService.remove(+id);
  }
}
