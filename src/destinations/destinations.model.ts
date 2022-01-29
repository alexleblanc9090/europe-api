export class Destination{

    //PROPS
    readonly Id: string;
    public City: string;
    public Country: string;

    //Constructor
    constructor(id: string, city:string, country: string){
        this.Id = id;
        this.City = city;
        this.Country = country;
    }
}