export const setTextFilter = (text = '') => ({
    type: 'SET-TEXT-FILTER',
    text
});

export const sortByAmount = () => ({
    type: 'SORT-BY-AMOUNT'
});

export const sortByDate = () => ({
    type: 'SORT-BY-DATE'
});

export const setStartDate = (date) => ({
    type: 'SET-START-DATE',
    date
});

export const setEndDate = (date) => ({
    type: 'SET-END-DATE',
    date
});