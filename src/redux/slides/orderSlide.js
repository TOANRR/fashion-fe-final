import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSlected: [],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {

        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product && item?.size === orderItem.size)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct, size } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct && item?.size === size)
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct && item?.size === size)
            itemOrder.amount++;
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct, size } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct && item?.size === size)
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct && item?.size === size)
            itemOrder.amount--;
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct, size } = action.payload

            const itemOrder = state?.orderItems?.filter((item) => !(item.product === idProduct && item.size === size))
            const itemOrderSeleted = state?.orderItemsSlected?.filter((item) => !(item.product === idProduct && item.size === size))

            state.orderItems = itemOrder;
            state.orderItemsSlected = itemOrderSeleted;
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload

            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders
            state.orderItemsSlected = itemOrdersSelected

        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.some(item => item.id === order.product && item.size === order.size)) {
                    orderSelected.push(order)
                };
            });
            state.orderItemsSlected = orderSelected
        },
        resetOrder: (state, action) => {
            state.orderItems = [];
            state.orderItemsSlected = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlide.actions

export default orderSlide.reducer