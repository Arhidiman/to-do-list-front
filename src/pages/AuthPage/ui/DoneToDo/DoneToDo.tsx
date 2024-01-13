import './DoneToDo.scss'

function DoneToDo({text}: {text: string}) {
        return (
        <div className='done-tasks__item'>
            {text}
        </div>
    )
}

export default DoneToDo
