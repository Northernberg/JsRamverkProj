import React, { useState, useEffect } from 'react';
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
        fontSize: 48,
        fontWeight: 800,
        textAlign: 'center',
        overflow: 'inherit',
        backgroundImage:
            'url(' + require('./assets/stockBackground.jpg') + ')',
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
        backgroundColor: 'royalblue !important',
    },
    button: {
        backgroundColor: 'royalblue !important',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 10px 10px -10px rgba(0, 0, 0, 0.5)',
        },
    },
}));
export const DialogComponent = props => {
    const classes = style();
    const [errorText, setErrorText] = useState({
        text: '',
        isError: false,
    });
    const handleClose = e => {
        props.setdialog({
            ...props.dialog,
            activated: false,
        });
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
        switch (props.dialog.type) {
            case 'Buy':
                handleBuy();
                break;
            case 'Sell':
                handleSell();
                break;
            default:
                return;
        }
    };
    const handleBuy = () => {
        console.log(props.stockOrder);
        console.log(
            JSON.stringify({
                ...props.stockOrder,
                email: localStorage.getItem('JWT')
                    ? jwt_decode(localStorage.getItem('JWT')).email
                    : '',
            }),
        );
        fetch(process.env.REACT_APP_API_ENDPOINT + '/objects/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('JWT'),
            },
            body: JSON.stringify({
                ...props.stockOrder,
                email: localStorage.getItem('JWT')
                    ? jwt_decode(localStorage.getItem('JWT')).email
                    : '',
            }),
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res);
                props.setUserStocks({
                    ...props.userStocks,
                    balance:
                        props.userStocks.balance - res.value.price,
                });
                props.socket.on('Broadcast', () => {
                    props.setStockOrder({
                        ...props.stockOrder,
                        totalPrice:
                            res.value.price * props.stockOrder.amount,
                        price: res.value.price,
                    });
                });
                props.socket.emit('Update stock', res);
            })
            .catch(err => {
                console.error(err);
            });
    };
    const handleSell = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/objects/sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('JWT'),
            },
            body: JSON.stringify({
                ...props.stockOrder,
                email: localStorage.getItem('JWT')
                    ? jwt_decode(localStorage.getItem('JWT')).email
                    : '',
            }),
        })
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res);
                props.setUserStocks({
                    ...props.userStocks,
                    balance:
                        props.userStocks.balance + res.value.price,
                });
                props.socket.on('broadcast', () => {
                    props.setStockOrder({
                        ...props.stockOrder,
                        totalPrice:
                            res.value.price * props.stockOrder.amount,
                        price: res.value.price,
                    });
                });
                props.socket.emit('Update stock', res);
            })
            .catch(err => {
                console.error(err);
            });
    };
    return (
        <div>
            <Dialog
                open={props.dialog.activated}
                onClose={handleClose}
            >
                <DialogTitle classes={{ root: classes.blue }}>
                    {props.dialog.type} stock: {props.stockOrder.name}
                </DialogTitle>
                <div className={classes.dialog}>
                    <Box m={2}>
                        <TextField
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: props.stockOrder.maxAmount,
                                },
                                type: 'number',
                                value: props.stockOrder.amount,
                            }}
                            margin="normal"
                            value={props.stockOrder.amount}
                            onChange={handleAmount}
                            variant="outlined"
                            fullWidth={true}
                            error={errorText.isError}
                        ></TextField>
                    </Box>

                    <Box m={2}>${props.stockOrder.totalPrice}</Box>
                    <Box m={2}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={handleClick}
                            disabled={errorText.isError}
                        >
                            Submit
                        </Button>
                    </Box>
                </div>
            </Dialog>
        </div>
    );
};
