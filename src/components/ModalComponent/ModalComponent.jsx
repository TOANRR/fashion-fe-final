import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'Modal', isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} okButtonProps={{ style: { backgroundColor: 'black', color: 'white' } }} {...rests}>
            {children}
        </Modal>
    )
}

export default ModalComponent