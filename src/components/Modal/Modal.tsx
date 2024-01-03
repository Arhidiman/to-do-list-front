import {MouseEventHandler} from "react";
import {Modal as AntModal} from "antd";

interface IModal {
    confirmHandler: MouseEventHandler<HTMLButtonElement>,
    cancelHandler: MouseEventHandler<HTMLButtonElement>
    title: string,
    isOpen: boolean
}

function Modal({confirmHandler, title, isOpen, cancelHandler}: IModal) {
    return (
        <AntModal
            onOk={confirmHandler}
            title={title}
            open={isOpen}
            onCancel={cancelHandler}
        />
    )
}

export default Modal
