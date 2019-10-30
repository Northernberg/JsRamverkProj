import React, { useState } from 'react';
import {
    Dialog,
    Button,
    TextField,
    makeStyles,
    Box,
    DialogTitle,
} from '@material-ui/core';
const jwt_decode = require('jwt-decode');
const style = makeStyles(() => ({
    stockContainer: {
        margin: 'auto',
        justifyContent: 'space-evenly',
        backgroundColor: '#FE9B00',
        border: '1px solid',
        borderRadius: '5px',
        alignItems: 'center',
    },
    orange: {
        backgroundColor: '#FE9B00',
    },
    dialog: {
        overflow: 'hidden',
        fontSize: 48,
        fontWeight: 800,
        textAlign: 'center',
        backgroundImage: 'url(' + require('./assets/bank.jpg') + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 50,
        '& *': {
            fontSize: 30,
            fontWeight: 800,
        },
    },
    error: {
        width: 100,
        height: 100,
        fontSize: 'fit-content',
    },
    blue: {
        backgroundColor: 'royalblue',
    },
    button: {
        backgroundColor: 'royalblue !important',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 10px 10px -10px rgba(0, 0, 0, 0.5)',
        },
    },
}));
export const MoneyDialog = props => {
    const classes = style();
    const [errorText, setErrorText] = useState({
        text: '',
        isError: false,
    });
    const handleClose = e => {
        props.setdialog(0);
    };
    const handleAmount = e => {
        if (
            e.target.value >= props.stockOrder.maxAmount ||
            e.target.value < 1
        ) {
            setErrorText({
                text: 'Max limit reached',
                isError: true,
            });
        } else {
            setErrorText({
                isError: false,
            });
        }
        props.setStockOrder({
            ...props.stockOrder,
            totalPrice:
                parseInt(props.stockOrder.price) *
                parseInt(e.target.value),
            amount: parseInt(e.target.value),
        });
    };
    const handleClick = () => {
        fetch(
            process.env.REACT_APP_API_ENDPOINT + '/economy/insert',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('JWT'),
                },
                body: JSON.stringify({
                    email: jwt_decode(localStorage.getItem('JWT'))
                        .email,
                }),
            },
        )
            .then(res => {
                return res.json();
            })
            .then(res => {
                props.setUserStocks({
                    ...props.userStocks,
                    balance: props.userStocks.balance + 500,
                });
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Dialog open={props.dialog} onClose={handleClose}>
            <DialogTitle classes={{ root: classes.blue }}>
                Insert Money
            </DialogTitle>
            <div className={classes.dialog}>
                <Button
                    className={classes.button}
                    onClick={handleClick}
                >
                    Insert $500
                </Button>
            </div>
        </Dialog>
    );
};
