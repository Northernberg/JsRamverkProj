[![Build Status](https://travis-ci.org/Northernberg/Jsramverk.svg?branch=master)](https://travis-ci.org/Northernberg/JsramverkProj)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Northernberg/Jsramverk/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Northernberg/JsramverkProj/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Northernberg/Jsramverk/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Northernberg/JsramverkProj/build-status/master)

# Setup

```
git clone https://github.com/Northernberg/JsRamverkProj.git
npm install
```

# Start application

`node app.js`

# Access app at:
`localhost:3000`
# Tools

## React

I used React Framework to create my frontend. I chose this to work with a new Framework and because of it's current rise in popularity.
It is very modular, which I thought would be key when creating something you haven't done before.

# Websocket

I used socket io client to implement a websocket towards the backend API. It sends a update on the stock price and a timestamp to the socket, which is then emitted towards all the connected clients. In the detailed stock view page the user will see a live updated graph of the growth in the stock. I chose socket Io because of it's simplicity and simply having prior knowledge.
