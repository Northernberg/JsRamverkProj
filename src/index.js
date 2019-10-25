import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Navbar } from './Navbar.js';
import { Home } from './view/Home.js';
import { Login } from './view/login.js';
import { StockView } from './view/StockView.js';
import { Registration } from './view/Registration.js';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const Routing = () => {
    const [auth, setAuth] = useState(
        localStorage.getItem('JWT') ? true : false,
    );
    const login = () => {
        console.log(auth);
        setAuth(true);
    };
    const logout = () => {
        localStorage.clear();
        setAuth(false);
    };
    return (
        <Router history={history}>
            <Navbar auth={auth} logout={logout}></Navbar>
            {auth ? (
                <Route exact path="/" component={Home} />
            ) : (
                <Route exact path="/" component={Login} />
            )}
            <Route
                path="/login"
                render={props => <Login {...props} login={login} />}
            />
            <Route path="/register" component={Registration} />
            <Route path="/stock/:name" component={StockView} />
        </Router>
    );
};

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
