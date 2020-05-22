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
        .then(response => {
            if (response.ok){
                return response
            }
            else{
                var err = new Error(`Error ${response.status} : ${response.statusText}`)
                err.response = response;
                throw err;
            }
        },err=>{
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then(response=>response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error=>dispatch(dishesFailed(error.message)));
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
        .then(response => {
            if (response.ok){
                return response
            }
            else{
                var err = new Error(`Error ${response.status} : ${response.statusText}`)
                err.response = response;
                throw err;
            }
        },err=>{
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then(response=>response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error=>dispatch(commentsFailed(error.message)));
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
        .then(response => {
            if (response.ok){
                return response
            }
            else{
                var err = new Error(`Error ${response.status} : ${response.statusText}`)
                err.response = response;
                throw err;
            }
        },err=>{
            var errMess = new Error(err.message);
            throw errMess;
        })
        .then(response=>response.json())
        .then(promotions => dispatch(addPromos(promotions)))
        .catch(error=>dispatch(promosFailed(error.message)));
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