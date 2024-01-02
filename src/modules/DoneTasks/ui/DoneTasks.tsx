
import {shallow} from "zustand/shallow"
import {useToDoStore} from "../../CurrentTasks/store/useToDoStore.ts"
import DoneToDo from "../../../components/DoneToDo/DoneToDo.tsx"
import type {TToDoItem} from "../../CurrentTasks/store/useToDoStore.ts"
import './DoneTasks.scss'

export function DoneTasks() {
    console.log("DONE tasks render")

    const [
        doneTodos
    ] = useToDoStore((state) => [
        state.doneTodos
    ], shallow)


    const doneTodo = (todo: TToDoItem) => {
        return (
            <DoneToDo key={todo._id} text={todo.text}/>
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