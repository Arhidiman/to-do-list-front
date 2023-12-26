
import {useToDoStore} from "../../store/useToDoStore.tsx";
import DoneToDo from "../DoneToDo/DoneToDo.tsx";
import type {TToDoItem} from "../../store/useToDoStore.tsx";
import './DoneTasks.scss'

function DoneTasks() {

    const {
        doneTodos
    } = useToDoStore()

    const doneTodo = (todo: TToDoItem) => {
        return (
            <DoneToDo key={todo.id} name={todo.name}/>
        )
    }

    return (
        <div className='done-tasks'>
            {doneTodos.map(doneTodo)}
        </div>
    )

}

export default DoneTasks
