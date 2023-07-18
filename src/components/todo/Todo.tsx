import React,{FC , FormEvent, useState} from "react";
import './Todo.css'
import { TodoList } from "../todolist/TodoList";
import ITodo from "../interfaces";
import AddTodo from "../addtodo/AddTodo";


const Todo: FC = () => {
    // const getStorageTodo:any = localStorage.getItem('todoList');
    // const arrStorageTodo = JSON.parse(getStorageTodo);

    const [ todoList , setTodoList ] = useState<ITodo[]>([]);
    const [searchTodo, setSearchTodo] = useState('');
    
    const addTodo = (todo :string) :void => {
        if(!todo){
            alert('mời nhâp');
            return ;
        }
        const dataTodo: ITodo = {
            id : todoList.length < 1 ? 1 : todoList[todoList.length - 1].id +1 ,
            todo :todo,
            complete :false
        }
         setTodoList([...todoList , dataTodo]);
        //  const storageTodo = [...todoList , dataTodo];
        //  localStorage.setItem('todoList', JSON.stringify(storageTodo));
       
    }
    const deleteTodo = (id:number):void => {
        setTodoList(
            todoList.filter((todo:ITodo): ITodo | null => {
                return(
                    id !== todo.id ? todo : null 
                )
            })
        )
    }
    const saveEditTodo = (item:ITodo , title :string ) => {
        
            let updateTodo = [...todoList].map((todo) => {
                if(item.id === todo.id){
                     todo.todo = title;
                }
                return todo;
            })
            setTodoList(updateTodo); 
    }

    const completeTodo = (id:number) :void => {
       const updetecomplete = todoList.map((item) => {
            if(item.id === id) {
                return {...item , complete: !item.complete}
            }
                return item;
        })
        setTodoList(updetecomplete);
    }
    const handleDeleteSelect = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('xóa ???') === true ){
            setTodoList(
                todoList.filter(item => {
                    return (item.complete === false ? item : null)
                })
            )
        }                 
     }
    let check = todoList.filter(todo => {
        if(todo.complete === true) {
            return true;
        }
    })
    const search = (text:string):void  => {
        console.log(text)
    }
    return(
        <div className="todo-container ">
            <AddTodo addTodo={addTodo} />
            <input 
                type="text" 
                placeholder="tìm kiếm"
                onChange={(e) => setSearchTodo(e.target.value)} 
            />
            <div className="todo-contents">
                { 
                    todoList.filter((item:ITodo )  => {
                        if(searchTodo === ""){
                                return item;
                            }
                        else if( item.todo.toLowerCase().includes( searchTodo.toLowerCase() ) ) {
                                return item ;
                            }
                    }).map((item:ITodo , key) => {
                        return(
                            <TodoList 
                                key={key}
                                item={item}
                                deleteTodo={deleteTodo}
                                saveEditTodo={saveEditTodo}
                                completeTodo={completeTodo}
                            />
                        )
                    } )
                }
                {
                    todoList.length > 0 && check.length > 1 && 
                    <button 
                        onClick={handleDeleteSelect} 
                        className="select-delete"
                    >
                        Delete
                    </button> 
                }
                            
            </div>
        </div>
    )
}
export default Todo ;