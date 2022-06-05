const { App } = require( '../src/App' );
// const { Post } = require( '../client/src/components/post' );

module.exports = [
    {
        path: '/',
        exact: true,
        component: App,
    }
    // {
    //     path: '/post',
    //     exact: true,
    //     component: Post,
    // }
];