import { BsCircle ,BsCheckCircle } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

const Task =(props)=>{
    return (
        <li>
            <div onClick={(e,i)=>props.f1(e,props.taskId)} >
                <p>
                    {props.b ? <BsCheckCircle className="ic" /> : <BsCircle className="ic checked" /> }
                </p>
                <p className={props.b ?"check":""} >{props.t}</p>
            </div>
            <button  >
                <AiFillDelete onClick={(e,i)=>props.f2(e,props.taskId)} />
            </button> 
        </li>)
}

export default Task ;