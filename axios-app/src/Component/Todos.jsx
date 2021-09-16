
import { useEffect, useState } from "react";
import "./Todos.css";
import axios from "axios";


function Todos() {

     const [text, setText] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [page, setPage] = useState(1);

 useEffect(() => {
        getTodo();
    }, [page]);

    async function getTodo() {
        const res = await axios.get(`http://localHost:3001/todos`,
            {
                params: {
                    _page: page,
                    _limit: 3,
                },
            });
      //  total.current = res.headers["x-total-count"];
        setTodoList(res.data);
        
    }
    
 const postData = async () => {
        const data = {
            title: text,
            status: false,
        };
        await axios.post("http://localhost:3001/todos", data);
        getTodo();
        setText("");
    }

    return (
       <div>
            <input className="input" placeholder="add todo" type="text" onChange={(e) => {
                setText(e.target.value);
            }} />
            <button  className="butt" onClick={
                postData
            }>Add</button>
             
            {
                todoList.map((e) => (
                    <div className="todos" 
                    key={e.id}
                >
                    <p className="text">{e.title}</p>

                   </div>
                ))
            }
            <div className="butts">
                 <button onClick={() => {
                setPage(page - 1);
            }}>Prev Page</button>
            <button onClick={() => {
                setPage(page + 1);
            }}>Next Page</button>
           </div>
           
           
        </div>
    );
}

export default Todos;