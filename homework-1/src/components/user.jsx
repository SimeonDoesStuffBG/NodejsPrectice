
import { DISCONNECTED, NA, USER } from './enums';

export class User {
    constructor(id = '', name='', username='',password='',gender='', role=USER, picture='',status=DISCONNECTED){
        this.id=id;
        this.name=name;
        this.username=username;
        this.password=password;
        this.gender=gender;
        this.role=role;
        this.picture=picture;
        this.status=status;
        this.createdAt=new Date().toString();
        this.lastUpdate=this.createdAt;
    }
}