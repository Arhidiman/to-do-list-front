
import {shallow} from "zustand/shallow"
import {useToDoStore} from "../../store/toDoStore/useToDoStore.ts"
import DoneToDo from "../DoneToDo/DoneToDo.tsx"
import type {TToDoItem} from "../../store/toDoStore/useToDoStore.ts"
import './DoneTasks.scss'

function DoneTasks() {
    console.log("DONE tasks render")

    const [
        doneTodos
    ] = useToDoStore((state) => [
        state.doneTodos
    ], shallow)


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
