
import axios from "axios";

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,


    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
}
    from '../constants/productConstants'

// let productGet = "http://127.0.0.1:4000/api/v1/products"

export const getProducts = (keyword = '',currentPage = 1, price, category)=>async (dispatch) =>{
    try {
        dispatch ({type:ALL_PRODUCTS_REQUEST})

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`


        if (category){
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`

        }


        const {data} = await  axios.get(link)

        dispatch ({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}

//product detail single product

export const getProductDetails = (id)=>async (dispatch) =>{
    try {
        dispatch ({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await  axios.get(`/api/v1/product/${id}`)

        dispatch ({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}






// CLEAR_ERRORS

export const clearErrors = () =>async(dispatch) =>{
    dispatch ({
        type:CLEAR_ERRORS
    })
}
















