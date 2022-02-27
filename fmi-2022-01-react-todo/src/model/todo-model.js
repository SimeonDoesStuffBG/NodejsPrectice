export const ALL_STAT = 0;
export const ACTIVE = 1;
export const DONE = 2;
export const CANCELLED = 3;

export const ToDoStats = ['All stats','Active', 'Done','Cancelled']

export class Todo{
    static nextID = 0;
    id = ++Todo.nextID;

    constructor(text, stat=ACTIVE){
        this.text = text;
        this.stat = stat;
    }
}