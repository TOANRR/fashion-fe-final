import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
  isImage: false,
  productImgs: []
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      const { isImage, search, productImgs } = action.payload
      state.search = search;
      state.isImage = isImage;
      state.productImgs = productImgs
      console.log("img", productImgs)
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer