import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return(dispatch) => {
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };

        database.ref('expenses').push(expense).then((exp) => {
            dispatch(addExpense({
                id: exp.key,
                ...expense
            }))
        });
    };
};

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE-EXPENSE',
    id
});

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }))
        });
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT-EXPENSE',
    id,
    updates
});

export const setExpenses = (expenses) => ({
    type: 'SET-EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];

            snapshot.forEach((expense) => {
                expenses.push({
                    id: expense.key,
                    ...expense.val()
                })
            });

            dispatch(setExpenses(expenses));
        })
    }
};