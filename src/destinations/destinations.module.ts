import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationsController } from './destinations.controller';
import { DestinationSchema } from './destinations.model';
import { DestinationsService } from './destinations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Destination', schema: DestinationSchema}]),
  ],
  controllers: [ DestinationsController],
  providers: [DestinationsService],
})
export class DestinationsModule {}