import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { DestinationsModule } from './destinations.module';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
    constructor(private readonly destinationsService: DestinationsService) { }

    @Post()
    addDestination(
        @Body('city') city: string,
        @Body('country') country: string
    ): any {
        console.log(city, country)
        const generatedId = this.destinationsService.addDestination(city,country);
        return {id: generatedId};
    }

    @Get()
    getDestinations(){
        const listOfDestinations = this.destinationsService.getDestinations();
        return listOfDestinations;
    }

    @Get(':id')
    getDestinationsById(@Param('id') destId: string){
        const listOfDestinations = this.destinationsService.getDestinationsById(destId);
        return listOfDestinations;
    }

    @Patch(':id')
    updateDestination(
        @Param('id') destId: string,
        @Body('city') city: string,
        @Body('country') country: string,
        ){
          this.destinationsService.updateDestination(destId, city, country);  
          return null;  
    }

    @Delete(':id')
    deleteDestination(
        @Param('id') destId: string
    )
    {
        console.log('HERE',destId)
        this.destinationsService.deleteDestination(destId);
        return null;
    }

}