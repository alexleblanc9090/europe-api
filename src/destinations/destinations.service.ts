import { Injectable, NotFoundException } from '@nestjs/common';
import { Destination } from './destinations.model';
import { v4 as uuid } from 'uuid';
import { threadId } from 'worker_threads';

@Injectable()
export class DestinationsService {
    private destinations: Destination[] = [];

    addDestination(city: string, country:string): string{
        //SHOULD DO SOME VALIDATION HERE
        try{
            const id: string = uuid();
            //console.log(id)
            const newDestinations = new Destination( id , city , country );
            console.log(newDestinations)
            this.destinations.push(newDestinations);
            console.log(this.destinations)
            return id;
        }
        catch(e){
            console.log(e)
        }

    }


    //GET ALL Destinations

    getDestinations(): Destination[] {
        //Retourne une copie des destinations
        return [...this.destinations];
    }

    //GET ONE Destinations by the id

    getDestinationsById(destId: string){
        const destFound = this.findDestination(destId)[0];
        return {...destFound};
    }

    //UPDATE Destination

    updateDestination(destId: string, city: string, country: string ){
        const [destFound, index] = this.findDestination(destId);
        //Copy the old destination infos
        const updateDestination = {...destFound};

        if(city)
            updateDestination.City = city;
        if(country)
            updateDestination.Country = country;

        this.destinations[index] = updateDestination;

        
    }

    deleteDestination(id: string){
        const destinationIndex = this.findDestination(id)[1];
        this.destinations.splice(destinationIndex,1);
    }

    //Methods

    private findDestination(id: string): [Destination, number]{
        const destIndex = this.destinations.findIndex((d) => d.Id === id);
        const destFound = this.destinations[destIndex];
        if(!destFound)
            throw new NotFoundException('Destinations do not exist');

        return [destFound, destIndex];
    }
}