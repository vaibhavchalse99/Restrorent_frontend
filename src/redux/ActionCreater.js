import * as ActionTypes from './ActionTypes';
import {DISHES} from '../shared/dishes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:{
        dishId:dishId,
        rating:rating,
        author:author,
        comment:comment
    }
})

export const fetchDishes = () =>(dispatch)=>{
    dispatch(dishesLoading(true));
    
    return fetch(baseUrl+'dishes')
        .then(response=>response.json())
        .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type:ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errormessage)=>({
    type: ActionTypes.DISHES_FAILED,
    payload:errormessage
})

export const addDishes = (dish)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dish
})


export const fetchComments = () =>(dispatch)=>{
    
    return fetch(baseUrl+'comments')
        .then(response=>response.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errormessage)=>({
    type: ActionTypes.COMMENTS_FAILED,
    payload:errormessage
})

export const addComments = (comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})


export const fetchPromos = () =>(dispatch)=>{
    dispatch(promosLoading(true));
    
    return fetch(baseUrl+'promotions')
        .then(response=>response.json())
        .then(promotions => dispatch(addPromos(promotions)));
}

export const promosLoading = () => ({
    type:ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errormessage)=>({
    type: ActionTypes.PROMOS_FAILED,
    payload:errormessage
})

export const addPromos = (promos)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promos
})