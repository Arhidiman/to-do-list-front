import {PlusOutlined, EditOutlined, CheckOutlined, DeleteOutlined, ArrowDownOutlined} from "@ant-design/icons";
import {Button} from "antd";
import type {MouseEventHandler} from "react";
import './ActionButton.scss'

type TActions = 'add' | 'edit' | 'check' | 'delete' | 'complete'
interface IActionButton {
    className?: string
    text?: string
    actionHandler: MouseEventHandler<HTMLElement>
    type: TActions
}
function ActionButton({className, text, actionHandler, type}: IActionButton) {

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
            className={`action-button ${className && className}`}
            onClick={actionHandler}
        >
            {text}
            {getActionIcon(type)}
        </Button>
    )
}

export default ActionButton
