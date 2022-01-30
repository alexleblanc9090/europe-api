import * as mongoose from 'mongoose'

export const DestinationSchema = new mongoose.Schema({
    city: {type: String, required: true},
    country: {type: String, required: true}
});

export interface Destination extends mongoose.Document{

    //PROPS
    id: string;
    city: string;
    country: string;
}