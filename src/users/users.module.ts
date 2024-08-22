import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
