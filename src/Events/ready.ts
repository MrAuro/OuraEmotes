import { Event } from '../Interfaces';

export const event: Event = {
    name: 'ready',
    run: (client) => {
        require('child_process').exec('git rev-parse --short HEAD', function (err, stdout) {
            console.log(`${client.user.username} is online in ${client.guilds.cache.size} servers on commit ${stdout}`);
        });

        // set the activity
        client.user.setPresence({
            activity: { type: 'WATCHING', name: 'for $help' },
        });

        // set the activity every 10 minutes in case connection is lost
        setInterval(() => {
            client.user.setPresence({
                activity: { type: 'WATCHING', name: 'for $help' },
            });
        }, 60000 * 10);
    },
};
