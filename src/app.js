import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses'; 
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water', amount: 6000, note: 'Enterprise Water Bill', createdAt: 20000 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount: 3000, note: 'Gas Bill', createdAt: 50000 }));
store.dispatch(addExpense({ description: 'Food', amount: 504, note: 'Food Bill', createdAt: 40000 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));