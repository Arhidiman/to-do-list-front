import './DoneToDo.scss'

function DoneToDo({name}: {name: string}) {
        return (
        <div className='done-tasks__item'>
            {name}
        </div>
    )
}

export default DoneToDo
