import React,{FC , useState} from 'react';
import ITodo from '../interfaces';
import "./TodoList.css"

interface IProps {
    item:ITodo,
    deleteTodo(id:number): void,
    saveEditTodo(item:ITodo , title:string) : void ,
    completeTodo(id:number) : void
}
export const TodoList: React.FC<IProps> = ({item , deleteTodo , saveEditTodo , completeTodo}) => {
    const [editTodo , setEditTodo ] = useState<ITodo | null>(null);
    const [onChangeEdit , setOnchangeEdit] = useState(item.todo);

    const handleDeleteTodo =(item:ITodo) => {
        deleteTodo(item.id);
    }
    // const handleOnchangeEdit = (e: string) => {
    //     setOnchangeEdit(e);
    //  }
    const handleEditTodo =(item:ITodo) => {
        saveEditTodo(item , onChangeEdit);
        setEditTodo(null);

    }
    const handlecomplete = (item:ITodo) => {
        completeTodo(item.id)
    }
    return(
        
        <div  className='child-todo'>
            {
            editTodo === null ?
            <>
                <div 
                    onClick={()=> handlecomplete(item)}  
                    className={item.complete ? "text-child-todo complete ": "text-child-todo" } 
                >
                    <input 
                        type="checkbox" 
                        onChange={()=>{}} checked={item.complete} 
                    /> 
                    <label> {item.todo} </label>
                </div>
                <div className="handle-todo">
                    <button 
                        type='button'
                        onClick={() => setEditTodo(item)} 
                        className="btn-edit"
                    >
                        <i className="fa-solid fa-pen-to-square"></i> 
                    </button>
                    <button 
                        onClick={() => handleDeleteTodo(item)} 
                        className="btn-delete"
                    >
                        <i className="fa-regular fa-trash-can"></i> 
                    </button>
                </div>
            </>
            :
            <>
                <div className="text-child-todo" >
                    <input 
                        type="text" 
                        value={onChangeEdit} 
                        onChange = {(e) => setOnchangeEdit(e.target.value)} 
                    />
                </div>
                <div className="handle-todo">
                    <button  
                        onClick={() => handleEditTodo(editTodo)} 
                        className="btn-edit"
                    >
                        {
                            editTodo.id === item.id && editTodo !== null 
                            ? 
                            <i className="fa-regular fa-circle-check"></i> 
                            : 
                            <i className="fa-solid fa-pen-to-square"></i>
                        }
                    </button>
                    <button 
                        onClick={() => setEditTodo(null)} 
                        className="btn-delete"
                    >
                        <i className="fa-regular fa-rectangle-xmark"></i> 
                    </button>
                </div> 
            </>
            }
        </div> 
    )
} 