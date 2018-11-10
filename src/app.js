import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    console.log('DENTRO DE RENDERAPP');
    console.log('HASRENDERED:' + hasRendered);
    if (!hasRendered) {
        console.log('dentro de reactDOM.render');
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
        console.log('HASRENDERED cambia:' + hasRendered);
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log('USUARIO LOGGEADO');
        store.dispatch(login(user.uid));
        console.log('USUARIO LOGGEADO EN REDUX');
        store.dispatch(startSetExpenses()).then(() => {
            console.log('EXPENSES CARGADOS');
            renderApp();
            console.log('RENDERIZADO');
            if(history.location.pathname === '/'){
                console.log('history is /, will switch to /dashboard');
                history.push('/dashboard');
                console.log('switched');
            }
        });
    } else {
        console.log('NO HAY USUARIO LOGGEADO');
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});