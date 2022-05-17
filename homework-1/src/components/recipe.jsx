export class Recipe{
    constructor(id='',creatorID='',name='',briefDesc='',timeToCook=0,products=[],longDesc='',picture='',tags=[],){
        this.id = id;
        this.creatorID=creatorID;
        this.name=name;
        this.briefDesc=briefDesc;
        this.timeToCook=timeToCook;
        this.products= [...products];
        this.longDesc=longDesc;
        this.picture=picture;
        this.tags=[...tags];  
        this.createdAt=new Date().toString();
        this.lastUpdate=this.createdAt;      
    }
}
 
