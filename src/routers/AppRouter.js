import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';
import HelpPage from '../components/HelpPage';
import EditExpense from '../components/EditExpense';
import CreateExpense from '../components/CreateExpense';
import ExpenseDashboard from '../components/ExpenseDashboard';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>        
                <Route path="/" component={ExpenseDashboard} exact/>
                <Route path="/create" component={CreateExpense}/>
                <Route path="/edit/:id" component={EditExpense}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;