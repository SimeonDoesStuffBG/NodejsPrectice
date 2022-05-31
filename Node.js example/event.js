const eventEditor = require('events');
const rx = require('rxjs');

class MyEventEmmiter extends eventEditor{
    constructor(){
        super();
        console.log('My event Emmiter creates');
    }
}

const ev = new MyEventEmmiter();
ev.on('MyEvent', event=>{
    console.log('What the FUCK? Anyway',event);
});
setTimeout(500);
ev.addListener('MyEvent', event=>{
    console.log('sigh', event);
})

//generate event
for(var i = 0; i < 4; i++){
ev.emit('MyEvent', `Hi, ${i}`);}