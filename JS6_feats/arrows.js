'use strict'

const bob = {
    friends:['Alice' ,'Jane'],
    printFriends(){
        this.friends.forEach(f=>console.log($(this.name)+ "knows" + f));
    }
}