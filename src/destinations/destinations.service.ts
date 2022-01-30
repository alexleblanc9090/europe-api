import { Injectable, NotFoundException } from '@nestjs/common';
import { Destination, DestinationSchema } from './destinations.model';
import { v4 as uuid } from 'uuid';
import { threadId } from 'worker_threads';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class DestinationsService {
    private destinations: Destination[] = [];

    constructor(@InjectModel('Destination') private readonly destinationModel: Model<Destination>) {

    }

    async addDestination(city: string, country: string) {
        //SHOULD DO SOME VALIDATION HERE
        try {
            const newDestinations = new this.destinationModel({ city: city, country: country });
            const result = await newDestinations.save();
            return result.id as string;
        }
        catch (e) {
            console.log(e)
        }

    }


    //GET ALL Destinations

    async getDestinations() {
        const result = await this.destinationModel.find().exec();
        return result;
    }

    //GET ONE Destinations by the id

    async getDestinationsById(destId: string) {
        const destFound = await this.findDestination(destId);
        return destFound;
    }

    //UPDATE Destination

    async updateDestination(destId: string, city: string, country: string) {
        let destination= await this.findDestination(destId);
        
        if (city)
            destination.city = city;
        if (country)
            destination.country = country;

        destination.save();    
    }

    async deleteDestination(id: string) {
       const result = await this.destinationModel.deleteOne({_id: id}).exec();
       
       if(result.deletedCount == 0)
           throw new NotFoundException('no destination found for this id');
    }

    //Methods

    private async findDestination(id: string): Promise<Destination>{

        let destination;
        try{
            destination = await this.destinationModel.findById(id);
        }
        catch(e)
        {
            throw new NotFoundException();
        }

        if(!destination)
            throw new NotFoundException();

        return destination;
    }
}