const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('../node_modules/react');
const ReactDOMServer = require('../node_modules/react-dom/server');
// const { StaticRouter, useRouteMatch } = require('../node_modules/react-router-dom');
const chalk = require('chalk');
const log = console.log;
const _error = chalk.bold.red;
const warning = chalk.keyword('orange');

// create express application
const app = express();

var HTTP_PORT = 9000


// import App component
const App = require('../src/App');

// import routes
// const routes = require('./routes');

// serve static assets
app.get(/\.(js|css|map|ico)$/, express.static(path.resolve(__dirname, '../build/static')));

// for any other requests, send `index.html` as a response
app.use('*', async (req, res) => {

    // get matched route
    // const matchRoute = routes.find(route => {
    //     return useRouteMatch(req.originalUrl, route)
    // });

    // fetch data of the matched component
    // let componentData = null;

    // if (typeof matchRoute.component.fetchData === 'function') {
    //     componentData = await matchRoute.component.fetchData();
    // }

    // read `index.html` file
    let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
        encoding: 'utf8',
    });

    // get HTML string from the `App` component
    let appHTML = ReactDOMServer.renderToString(<App />);

    // populate `#app` element with `appHTML`
    indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);

    // set value of `initial_state` global variable
    indexHTML = indexHTML.replace(
        'var initial_state = null;',
        // `var initial_state = ${JSON.stringify(componentData)};`
    );

    // set header and status
    res.contentType('text/html');
    res.status(200);

    return res.send(indexHTML);
});

// run express server on port 9000
try {
    app.listen(HTTP_PORT, () => {
        console.log(warning('🚀 Server ready at http://localhost:' + HTTP_PORT + '/'));
    });
} catch (error) {
    log(_error(error))
}