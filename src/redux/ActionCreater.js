import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};


export const postFeedback = (feedbackObject) => (dispatch)=>{
    var newObj = {
        firstname:feedbackObject.firstname,
        lastname:feedbackObject.lastname,
        telnum:feedbackObject.telnum,
        email:feedbackObject.email,
        agree:feedbackObject.agree,
        contactType:feedbackObject.contactType,
        message:feedbackObject.message,
    }
    newObj.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => {alert(JSON.stringify(response))})
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });

}




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





export const fetchLeaders = () =>(dispatch)=>{
    dispatch(leadersLoading(true))

    fetch(baseUrl+'leaders')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var err = new Error(`Error ${response.status} : ${response.statusText}`)
            err.response = response
            throw err
        }
    },err=>{
        var errMess = new Error(err.message);
        throw errMess;
    })
    .then(response=>response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error=>dispatch(leadersFailed(error.message)))
}

export const leadersLoading = ()=>({
    type:ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errorMessage)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errorMessage
})

export const addLeaders = (leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
})