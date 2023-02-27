export interface Messages {
    name:string,
    message:string,
    date:string,
    image:string,
    category:string
}
export interface msgCategories{
    id:number,
    category:string,
    items:Messages[];
}

