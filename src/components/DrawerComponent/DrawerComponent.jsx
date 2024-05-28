import { Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
    return (
        <>
            <Drawer title={title} styles={{
                body: { overflowY: 'auto', maxHeight: 'calc(110vh - 200px)' }
            }} placemen={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerComponent