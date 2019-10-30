import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const style = makeStyles(() => ({
    navbar: {
        flexWrap: 'wrap',
        fontFamily: 'CashFont',
        padding: 5,
        marginBottom: 16,
        height: '4rem',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'royalblue',
        boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        '& a, &:visited, &:hover': {
            textDecoration: 'none',
        },
        '& ul': {
            fontFamily: 'Modak, cursive',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexGrow: 1,
            margin: 'auto',
        },
        '& li': {
            textAlign: 'center',
            width: '10em',
            listStyle: 'none',
            border: '1px solid',
            borderRadius: 5,
            padding: 5,
            color: 'white',
            backgroundColor: 'white',
            '& a': {
                fontFamily: 'CashFont',
                color: 'black',
            },
            '& a:hover': {
                borderBottom: '1px solid',
            },
        },
    },
    logo: {
        height: '4rem',
        alignItems: 'center',
        display: 'flex',
        '& a': {
            fontWeight: 100,
            color: 'black',
        },
    },
    bottomNavbar: {
        position: 'fixed',
        fontFamily: 'CashFont',
        width: '100%',
        bottom: 0,
        backgroundColor: 'royalblue',
        '& ul': {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
    },
}));

export const Navbar = props => {
    const classes = style();
    const mobile = useMediaQuery('(max-width: 600px)');
    return mobile ? (
        <div className={classes.bottomNavbar}>
            <ul>
                <li>
                    <AccountBalanceIcon> </AccountBalanceIcon>
                    <NavLink exact activeClassName="Active" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    {props.auth ? (
                        <div>
                            <ExitToAppIcon> </ExitToAppIcon>
                            <NavLink
                                to="/login"
                                onClick={props.logout}
                            >
                                Logout
                            </NavLink>
                        </div>
                    ) : (
                        <div>
                            <EnhancedEncryptionIcon>
                                {' '}
                            </EnhancedEncryptionIcon>
                            <NavLink
                                activeClassName="Active"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    ) : (
        <div className={classes.navbar}>
            <div className={classes.logo}>
                {' '}
                <h1>
                    <NavLink to="/"> Investhurs(day)</NavLink>
                </h1>
            </div>
            <ul>
                <li>
                    <NavLink exact activeClassName="Active" to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    {props.auth ? (
                        <NavLink to="/login" onClick={props.logout}>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink activeClassName="Active" to="/login">
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </div>
    );
};
