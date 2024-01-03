import {Dispatch, EventHandler, SetStateAction} from "react";
import {Modal as AntModal} from "antd";

interface IModal {
    confirmHandler: EventHandler<HTMLElement>,
    cancelHanler: Dispatch<SetStateAction<boolean>>
    title: string,
    isOpen: boolean
}

function Modal({confirmHandler, title, isOpen, cancelHanler}: IModal) {
    return (
        <AntModal
            onOk={confirmHandler}
            title={title}
            open={isOpen}
            onCancel={cancelHanler}
        />
    )
}

export default Modal
