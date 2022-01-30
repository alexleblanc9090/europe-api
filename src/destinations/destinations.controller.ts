import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { DestinationsModule } from './destinations.module';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
    constructor(private readonly destinationsService: DestinationsService) { }

    @Post()
    async addDestination(
        @Body('city') city: string,
        @Body('country') country: string
    ){
        const generatedId = await this.destinationsService.addDestination(city,country);
        return generatedId;
    }

    @Get()
    async getDestinations(){
        const listOfDestinations = await this.destinationsService.getDestinations();
        return listOfDestinations;
    }

    @Get(':id')
    async getDestinationsById(@Param('id') destId: string){
        const listOfDestinations = await this.destinationsService.getDestinationsById(destId);
        return listOfDestinations;
    }

    @Patch(':id')
    async updateDestination(
        @Param('id') destId: string,
        @Body('city') city: string,
        @Body('country') country: string,
        ){
          await this.destinationsService.updateDestination(destId, city, country);  
          return null;  
    }

    @Delete(':id')
    async deleteDestination(
        @Param('id') destId: string
    )
    {
        await this.destinationsService.deleteDestination(destId);
        return null;
    }

}