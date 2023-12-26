
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
        <div>
            <h2 className='done-tasks__title'>Done tasks</h2>
            <div className='done-tasks'>
                {doneTodos.map(doneTodo)}
            </div>
        </div>

    )

}

export default DoneTasks
