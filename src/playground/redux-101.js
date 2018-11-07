import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementBy = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setBy = ({ setBy = 1 } = {}) => ({
    type: 'SET',
    setBy
});

const reset = () => ({
    type: 'RESET'
});

const store = createStore((state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT': 
         return {
            count: state.count + action.incrementBy
         };
        case 'DECREMENT': 
         return {
             count: state.count - action.decrementBy
         };
        case 'SET':
         return {
             count: action.setBy
         };
        case 'RESET':
         return {
             count: 0
         };
        default: 
         return state;
    }
});

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 15}));

store.dispatch(decrementBy({ decrementBy: 5 }));

store.dispatch(setBy({ setBy: 200 }));

store.dispatch(reset());