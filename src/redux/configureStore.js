import {createStore} from 'redux';
import {initialState, Reducer} from './reducer';

export const ConfigureStore = ()=>{       //configure a store
    const store = createStore(Reducer,initialState);
    return store;
}