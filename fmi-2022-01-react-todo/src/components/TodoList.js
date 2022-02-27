import {ALL_STAT, ToDoStats} from "../model/todo-model";

const TodoList = ({todos, filter, ...rest})=>(
    <div className="TodoList">
        <ol>
            {todos.filter(todo=>filter===ALL_STAT||todo.status===filter)
                .map(todo=>(<li>{todo.text} - {ToDoStats[todo.stat]}</li>))
            }
        </ol>
    </div>
);

export default TodoList;