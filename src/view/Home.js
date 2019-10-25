import React, { useState, useEffect } from 'react';
import {
    Table,
    makeStyles,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Container,
    Button,
    Box,
    CircularProgress,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import '../style/Home.css';
import { DialogComponent } from '../DialogComponent.js';
import { MoneyDialog } from '../MoneyDialog.js';
const jwt_decode = require('jwt-decode');

const style = makeStyles(() => ({
    table: {
        overflow: 'auto',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    stock: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: 200,
        margin: 16,
    },
    column: {
        flexDirection: 'column',
    },
    center: {
        alignItems: 'center',
    },
    img: {
        objectFit: 'contain',
    },
    container: {
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 18,
    },
    stockList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    balance: {
        fontFamily: 'CashFont',
        fontSize: '5em',
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export const Home = props => {
    const classes = style();
    const [stockList, setStockList] = useState({
        objects: [],
    });
    const [userStocks, setUserStocks] = useState({
        objects: [],
    });
    const [loading, setLoading] = useState(0);
    const [dialog, setdialog] = useState({
        type: '',
        activated: false,
    });
    const [stockOrder, setStockOrder] = useState({
        price: null,
        amount: 1,
        maxAmount: 1,
        name: '',
        img: '',
        totalPrice: 0,
    });
    const [moneyDialog, setMoneyDialog] = useState(0);
    useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/objects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error in fetch');
                }
            })
            .then(res => {
                console.log(res);
                setLoading(true);
                setStockList({
                    objects: res,
                });
            })
            .catch(err => {
                console.error(err);
            });

        fetch(
            process.env.REACT_APP_API_ENDPOINT +
                '/objects/' +
                jwt_decode(localStorage.getItem('JWT')).email,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('JWT'),
                },
            },
        )
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error in fetch');
                }
            })
            .then(res => {
                console.log(res);
                setLoading(true);
                setUserStocks({
                    balance: res[0].balance,
                    objects: res[0].stocks,
                });
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    const handleClick = (obj, type) => {
        console.log(obj);
        setStockOrder({
            ...stockOrder,
            name: obj.name,
            price: obj.price,
            maxAmount: obj.qty,
            img: obj.img,
            totalPrice: obj.price,
        });
        setdialog({
            activated: true,
            type: type,
        });
    };
    const handleMoney = () => {
        setMoneyDialog(1);
    };
    return (
        <Container maxWidth="md">
            {!loading && (
                <div className={classes.progress}>
                    <CircularProgress size={100} />
                </div>
            )}
            <div className={classes.container}>
                <h1> Your inventory</h1>

                <Box>
                    <p className={classes.balance}>
                        {' '}
                        ${userStocks.balance}{' '}
                    </p>
                    <Button
                        variant="outlined"
                        width="50%"
                        onClick={handleMoney}
                    >
                        Add moneyz
                    </Button>
                </Box>
                <Box className={classes.stockList}>
                    {userStocks.objects.map(obj => (
                        <Box className={classes.stock}>
                            <h2>
                                {' '}
                                <NavLink to={`/stock/${obj.name}`}>
                                    {obj.name}
                                </NavLink>
                            </h2>
                            <h2> Qty: {obj.qty}</h2>
                            <div>
                                <Button
                                    variant="outlined"
                                    width="50%"
                                    onClick={() =>
                                        handleClick(obj, 'Sell')
                                    }
                                >
                                    Sell
                                </Button>
                                <img
                                    src={require('../assets/' +
                                        obj.img)}
                                    alt="object"
                                    width="50px"
                                    height="50px"
                                    className={classes.img}
                                ></img>
                            </div>
                        </Box>
                    ))}
                </Box>
            </div>
            <div className={classes.container}>
                <h1> Market </h1>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Stock
                            </TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">
                                Quantity
                            </TableCell>
                            <TableCell align="left">Latest</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockList.objects.map(obj => (
                            <TableRow>
                                <TableCell align="left" width="300px">
                                    <div className={classes.flex}>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleClick(
                                                    obj,
                                                    'Buy',
                                                )
                                            }
                                        >
                                            Buy
                                        </Button>
                                        <img
                                            src={require('../assets/' +
                                                obj.img)}
                                            alt="object"
                                            width="50px"
                                            height="50px"
                                            className={classes.img}
                                        ></img>
                                    </div>
                                </TableCell>
                                <TableCell align="left" width="150px">
                                    {obj.name}
                                </TableCell>
                                <TableCell align="left">
                                    {obj.qty}
                                </TableCell>
                                <TableCell align="left">
                                    ${obj.price}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <DialogComponent
                setdialog={setdialog}
                dialog={dialog}
                setStockOrder={setStockOrder}
                stockOrder={stockOrder}
            ></DialogComponent>
            <MoneyDialog
                setdialog={setMoneyDialog}
                dialog={moneyDialog}
            ></MoneyDialog>
        </Container>
    );
};
