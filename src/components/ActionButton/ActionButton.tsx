import {PlusOutlined, EditOutlined, CheckOutlined, DeleteOutlined, ArrowDownOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {MouseEventHandler} from "react";


type TActions = 'add' | 'edit' | 'check' | 'delete' | 'complete'
interface IActionButton {
    actionHandler: MouseEventHandler<HTMLButtonElement>,
    type: TActions
}
function ActionButton({actionHandler, type}: IActionButton) {

    const getActionIcon = (type: TActions) => {
        switch (type) {
            case 'add': return <PlusOutlined/>
            case 'edit': return <EditOutlined/>
            case 'check': return <CheckOutlined/>
            case 'delete': return <DeleteOutlined/>
            case 'complete': return <ArrowDownOutlined/>
        }
    }
    return (
        <Button
            onClick={actionHandler}
        >
            {getActionIcon(type)}
        </Button>
    )
}

export default ActionButton
