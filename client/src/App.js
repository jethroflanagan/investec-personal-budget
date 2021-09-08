import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { AddExpense } from 'src/features/expense-group/AddExpense';
import { ExpenseGroup } from 'src/features/expense-group/ExpenseGroupContainer';
import './App.css';
// import { withRouter} from "react-router";
import { BankTransactions } from './features/bank-transactions/BankTransactionsContainer';
import { Loader } from './features/loader/Loader';
import { selectAppLoaded } from './features/loader/loaderSlice';
import { NavigationBar } from './features/navigation-bar/NavigationBar';

function App(props) {
  const { finished } = useSelector(selectAppLoaded);

  return (
    <Router>
      { !finished ? <Loader /> : null }
      { finished ? 
        <>
          <Switch>
            <Route path="/group/:groupId/add"><AddExpense /></Route>
            <Route path="/group/:groupId"><ExpenseGroup /></Route>
            <Route path="/bank"><BankTransactions /></Route>
          </Switch>
          <NavigationBar />
        </>
        : null
      }
    </Router>
  );
}

export default App;
