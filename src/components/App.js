import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/Theme'
import { Router ,Route } from "react-router-dom";

import Header from './common/Header';
import UserList from './user/UserList';
import Edituser from './user/EditUser';
import UserDelete from './user/UserDelete'
import history from '../history';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <Header />
                <Route path="/" exact component={UserList} />
                <Route path="/users/edit/:id" exact component={Edituser} />
                <Route path="/users/delete/:id" exact component={UserDelete} />
            </Router>
        </ThemeProvider>
    )
}

export default App
