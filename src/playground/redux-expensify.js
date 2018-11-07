import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    } 
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE-EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT-EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET-TEXT-FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT-BY-AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT-BY-DATE'
});

const setStartDate = (date) => ({
    type: 'SET-START-DATE',
    date
});

const setEndDate = (date) => ({
    type: 'SET-END-DATE',
    date
});

const expensesReducerDefaultState = [];
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [ ...state, action.expense];
        case 'REMOVE-EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT-EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET-TEXT-FILTER':
         return {
             ...state,
             text: action.text
         }
        case 'SORT-BY-AMOUNT':
         return {
             ...state,
             sortBy: 'amount'
         }
        case 'SORT-BY-DATE':
         return {
             ...state,
             sortBy: 'date'
         }
        case 'SET-START-DATE':
            return {
                ...state,
                startDate: action.date
            };
        case 'SET-END-DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
};

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Foode', note: 'Monthly payment in food', amount: 5000, createdAt: -21000 }));

const expenseTwo = store.dispatch(addExpense({ description: 'Rent', note: 'Monthly payment in Rent', amount: 3000, createdAt: -1025 }));

store.dispatch(sortByAmount());

/* store.dispatch(setStartDate(900));

store.dispatch(setEndDate(950)); */

//store.dispatch(setTextFilter(''));

const state = {
    expenses: [{
        id: 'fsakfdaslñfda',
        description: 'January Rent',
        note: 'This was the final payments for that address',
        amount: 54500,
        createdAt: 0,
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};