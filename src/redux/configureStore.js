import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Leaders } from './leaders'
import { Promotions } from './promotions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { InitialFeedback } from './forms';

export const ConfigureStore = ()=>{       //configure a store
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({
                feedback:InitialFeedback      //after form is submitted we want it to reset to InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    );
    return store;
}