const assetsBasePath = "./assets";


export class Course {

    id: number; 
    imageUrl: string;   
    thumbUrl: string;
   

    constructor(id: number, imageName: string){
        this.id = id;
        this.imageUrl = `${assetsBasePath}/images/${imageName}large.jpg`;
        this.thumbUrl = `${assetsBasePath}/images/${imageName}.jpg`;
    }   

}
