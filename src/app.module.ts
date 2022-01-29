import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  //LIST OF ALL MODULES USE IN THE CODE
  imports: [
    DestinationsModule,
    MongooseModule.forRoot('mongodb+srv://Alex:O4xReQ1xJ9XdcJs3@cluster0.6ewuk.mongodb.net/europeTripDatabase?retryWrites=true&w=majority')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
