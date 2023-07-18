import React,{FC, FormEvent , useState} from "react";
import "./AddTodo.css"

interface IProps {
    addTodo(todo:string) : void,
    
}
const AddTodo:FC<IProps> = ({addTodo}) => {
    const [todo , setTodo] = useState('');
    const handleAddTodo = (e: FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        addTodo(todo);
        setTodo("");
       
    }
    return (
        <div className="header-todo">
            <h1>Todo App</h1>
            <form action="#" onSubmit={handleAddTodo}>
                <input 
                    type="text" 
                    placeholder="Add Todo..."
                    value={todo}
                    onChange={(e)=> setTodo(e.target.value)}
                />
                <input type="submit" value="add" />
            </form>
        </div>
    )
}
export default AddTodo;