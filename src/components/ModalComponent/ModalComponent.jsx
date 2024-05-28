import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'Modal', isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} styles={{
            body: { overflowY: 'auto', maxHeight: 'calc(110vh - 200px)' }
        }} okButtonProps={{ style: { backgroundColor: 'black', color: 'white' } }} {...rests}>
            {children}
        </Modal >
    )
}

export default ModalComponent