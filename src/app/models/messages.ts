export interface Messages {
    name:string,
    message:string,
    date:string,
    image:string,
    category:string,
     ID?:number
}
export interface msgCategories{
    id:number,
    category:string,
    items:Messages[];
}

