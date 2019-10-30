import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    TextField,
    makeStyles,
    Grid,
    Container,
} from '@material-ui/core';
import { LineChart } from '../LineChart';
import io from 'socket.io-client';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    textField: {
        maxWidth: 200,
    },
    menu: {
        width: 100,
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
    },
    error: {
        color: 'red',
    },
}));

let socket;
export const StockView = ({ match }) => {
    const classes = useStyles();
    const [stockData, setStockData] = useState(0);
    useEffect(() => {
        socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
        fetch(process.env.REACT_APP_API_ENDPOINT + '/objects/find', {
            method: 'POST',
            body: JSON.stringify({ name: match.params.name }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('JWT'),
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
                setStockData(res[0]);
                socket.on('broadcast', update => {
                    //Set userlist UPDATE PRICES YES
                    if (update.name === res[0].name) {
                        setStockData(update);
                    }
                });
            })
            .catch(err => {
                console.error(err);
            });
        socket.on('');
    }, []);
    console.log(stockData);
    return (
        <Container maxWidth="md">
            <h1>Stock {match.params.name}</h1>
            {stockData ? (
                <LineChart
                    data={stockData.history}
                    color="rgba(0, 150, 64, 0.1)"
                    lineColor="rgb(0, 150, 64)"
                ></LineChart>
            ) : (
                ''
            )}
        </Container>
    );
};
