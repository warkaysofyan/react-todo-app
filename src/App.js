/* eslint-disable no-unused-vars */
import "./app.css"
import { useState } from "react"
import Task from "./task"
import { BsCircle ,BsCheckCircle } from 'react-icons/bs';



const App = ()=>{

    // ! local storage
    // ! set local storage 
    const setLocal = (arr)=>{
        let str = JSON.stringify(arr) ; 
        window.localStorage.list = str ;
    }
    // ! get local storage 
    const localList = () =>{
        let str = []
        if(window.localStorage.list !== undefined){
            str = JSON.parse(window.localStorage.list)
        }else{
            window.localStorage.list = '[]'; 
        }
        return str ;
    }

    const [list,setList] = useState(localList());
    
    const [listShown,setListShown] = useState("All");


    // ! this function is to add a task to the todo list
    const addTaskToList=()=>{
        let task = {
            id: list.length !== 0 ? list[list.length - 1].id + 1 : 0,
            content:document.getElementById("inp").value,
            done:checkBox
        }
        const newList = [...list,task] ;
        setList(newList);
        itemsLeft(newList);
    }
    // ! this function is to check a todo that is Existed in the the todo List
    const checkTaskInList=(e,i)=>{
        let newList = list.map(el=>{
            if(el.id===i){
                el.done = !el.done
                return el
            }else{
                return el
            }
        })
        setList(newList);
        itemsLeft(newList);
        setLocal(newList);
    }
    // ! this function is to delete a spesified task from the todo 
    const deleteTaskInList=(e,i)=>{
        let newList = list.filter(el=> el.id===i ? false : true )
        setList(newList);
        itemsLeft(newList);
    }
    // ! this function is to delete a spesified task from the todo 
    const deleteCompleatedTasks=()=>{
        let newList = list.filter(el=> el.done ? false : true )
        setList(newList);
        setLocal(newList);
    }
    // ! this is the content filter function to filter the list     
    const [checkBox,setCheckBox] = useState(true);
    let Content = ({fn1,fn2})=>{
        if(listShown === "Compleated"){
            return list.map( (el,i) => {
                if(el.done){
                    return <Task 
                        i={i} 
                        taskId={el.id} 
                        b={el.done} 
                        t={el.content} 
                        key={i} 
                        f1={fn1}
                        f2={fn2}
                        />
                }else {
                    return <></>
                }
            })
        }else if(listShown === "Active"){
            return list.map( (el,i) => {
                if(!el.done){
                    return <Task 
                        i={i} 
                        taskId={el.id} 
                        b={el.done} 
                        t={el.content} 
                        key={i} 
                        f1={fn1}
                        f2={fn2}/>
                }else {
                    return <></>
                }
            })
        }else{
            return list.map( (el,i)=> {
                return <Task 
                    i={i} 
                    taskId={el.id} 
                    b={el.done} 
                    t={el.content} 
                    key={i} 
                    f1={fn1}
                    f2={fn2}/>
                
            })
        }
    }
    // ! this function is to count how meny undone items left in the list 
    const countLeft = (arr) =>{
        let X = arr.length ; 
    arr.forEach(el=>{
            if(el.done){
                X--
            }
        })
        setLocal(arr);
        return X
    }
    const [left,setLeft] = useState(countLeft(list));
    const itemsLeft = (arr) =>{
        setLeft(countLeft(arr));
    }
    // ! this os the <App /> component
    return(
    <div className="container"  >
        <div className="containerA" >
            <p onClick={e => setCheckBox(!checkBox)} >
                {checkBox?<BsCheckCircle className="ic" /> : <BsCircle className="ic checked" />}
            </p>
            <input type="text"  id="inp" className="a"/>
            <button className="b" onClick={addTaskToList} >Add todo</button>
        </div>
        <ul className="list" id="list">
            <Content fn1={checkTaskInList} fn2={deleteTaskInList} />
        </ul>
        <div className="btns" >
            <div className="left" >{left} items left </div>
            <div className="filters" >
                <input style={{ color : listShown === "All" ? "blue" : "black" }} type="button" onClick={e=>setListShown(e.target.value)} value="All" />
                <input style={{ color : listShown === "Active" ? "blue" : "black" }} type="button" onClick={e=>setListShown(e.target.value)} value="Active" />
                <input style={{ color : listShown === "Compleated" ? "blue" : "black" }} type="button" onClick={e=>setListShown(e.target.value)} value="Compleated" />
            </div>
            <input onClick={deleteCompleatedTasks} type="button" value="Clear Compleated" />
        </div>
    </div>
        )
    // ! do not write here
}

export default App