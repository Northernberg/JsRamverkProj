import React, { useState } from 'react';
import {
    Button,
    TextField,
    makeStyles,
    Container,
} from '@material-ui/core';
import { NavLink, Route } from 'react-router-dom';
import { Registration } from './Registration.js';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    textField: {
        maxWidth: 200,
    },
    form: {
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
    },
}));

export const Login = props => {
    const classes = useStyles();
    const [formValues, setValues] = useState({
        email: '',
        password: '',
    });
    function handleChange(event) {
        event.preventDefault();
        const target = event.target;
        setValues({
            ...formValues,
            [target.name]: target.value,
        });
    }
    console.log(formValues);
    function handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API_ENDPOINT + '/login', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(formValues), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error, unable to login');
                }
            })
            .then(response => {
                console.log(JSON.stringify(response));
                localStorage.setItem('JWT', response.token);
                localStorage.setItem('name', response.username);
                props.login();
                props.history.push('/');
            })
            .catch(err => console.error(err));
    }
    return (
        <Container maxWidth="md">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    label="email"
                    type="email"
                    name="email"
                    value={formValues.email}
                    className={classes.textField}
                    onChange={handleChange}
                ></TextField>
                <TextField
                    name="password"
                    label="password"
                    type="password"
                    value={formValues.password}
                    className={classes.textField}
                    onChange={handleChange}
                ></TextField>
                <Button
                    type="submit"
                    className={classes.textField}
                    color="primary"
                    variant="contained"
                >
                    Submit
                </Button>
                <NavLink activeClassName="Active" to="/register">
                    Register here
                </NavLink>
            </form>
            <Route path="/register" component={Registration} />
        </Container>
    );
};
