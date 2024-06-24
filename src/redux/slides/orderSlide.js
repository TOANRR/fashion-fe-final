import { createSlice } from '@reduxjs/toolkit'
import { updateOrder } from '../../services/OrderService'

const initialState = {
    orderItems: [],
    orderItemsSlected: [],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    delivery: '',
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    uuid: ''
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        orderPayment: (state, action) => {
            const { orderItems = [], orderItemsSlected = [], shippingAddress = {}, paymentMethod = '',
                itemsPrice = '', shippingPrice = '', totalPrice = '', user = '', isPaid = false, paidAt = '',
                isDelivered = false, deliveredAt = '', uuid = '', delivery = '' } = action.payload
            console.log(action.payload)
            state.orderItems = orderItems ? orderItems : state.orderItems;
            state.orderItemsSlected = orderItemsSlected ? orderItemsSlected : state.orderItemsSlected;
            state.shippingAddress = shippingAddress ? shippingAddress : state.shippingAddress;
            state.paymentMethod = paymentMethod ? paymentMethod : state.paymentMethod;
            state.itemsPrice = itemsPrice ? itemsPrice : state.itemsPrice;
            state.isPaid = isPaid ? isPaid : state.isPaid;
            state.paidAt = state.paidAt;
            state.isDelivered = isDelivered ? isDelivered : state.isDelivered;
            state.deliveredAt = state.deliveredAt;
            state.shippingPrice = shippingPrice ? shippingPrice : state.shippingPrice;
            state.totalPrice = totalPrice ? totalPrice : state.totalPrice;
            state.user = user ? user : state.user;
            state.delivery = delivery ? delivery : state.delivery;

            state.uuid = uuid ? uuid : state.uuid;
        },
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
        setAmount: (state, action) => {
            const { idProduct, size, amount } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct && item?.size === size)
            const itemOrderSelected = state?.orderItemsSlected?.find((item) => item?.product === idProduct && item?.size === size)
            itemOrder.amount = amount;
            if (itemOrderSelected) {
                itemOrderSelected.amount = amount;
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
            console.log(listChecked, state.orderItems, state.orderItemsSlected)


            // Lọc ra các mục mà không có trong listChecked dựa trên cả product và size
            const itemOrders = state.orderItems.filter(item => !listChecked.some(checkItem => checkItem.product === item.product && checkItem.size === item.size));
            const itemOrdersSelected = state.orderItemsSlected.filter(item => !listChecked.some(checkItem => checkItem.product === item.product && checkItem.size === item.size));

            // Cập nhật lại state
            state.orderItems = itemOrders;
            state.orderItemsSelected = itemOrdersSelected;

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
            state.shippingAddress = {};
            state.paymentMethod = '';
            state.itemsPrice = 0;
            state.shippingPrice = 0;
            state.taxPrice = 0;
            state.totalPrice = 0;
            state.user = '';
            state.isPaid = false;
            state.paidAt = '';
            state.isDelivered = false;
            state.deliveredAt = '';
            state.uuid = ''
        },
        resetState: (state, action) => {
            state.orderItems = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder, resetState, setAmount, orderPayment } = orderSlide.actions

export default orderSlide.reducer