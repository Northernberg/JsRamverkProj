import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { LineChart } from '../LineChart';
import io from 'socket.io-client';

let socket;
export const StockView = ({ match }) => {
    const [stockData, setStockData] = useState(0);
    useEffect(() => {
        socket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
            reconnectionAttempts: 2,
        });
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
    }, [match.params.name]);
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
