import Client from './Client';

new Client().init();

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection', p, reason);
});
