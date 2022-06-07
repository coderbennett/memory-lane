const db = require('./connection');
const { User, Timeline } = require('../models');

db.once('open', async () => {
    await Timeline.deleteMany();

    const timelines = await Timeline.insertMany([
        { title: 'Star Wars Timeline', description: 'A timeline of when all the Star Wars shows and movies occurred', author: 'yodafather'},
        { title: 'Polar Ice Caps', description: 'A timeline of the polar ice caps over the past 40 years.', author: 'meltingicequeen'},
        { title: 'Major US Historical Events', description: 'A timeline of major historical US events', author: 'notaspy'}
    ]);

    console.log('timelines seeded');

    await User.deleteMany();

    await User.create({
        username: 'yodafather',
        email: 'yoda@jedicouncil.com',
        password: 'sizemattersnot'
    });

    await User.create({
        username: 'meltingicequeen',
        email: 'elsa@cold.com',
        password: 'letitGO'
    });

    await User.create({
        username: 'notaspy',
        email: 'nsa@gov.com',
        password: 'password123'
    });

    console.log('users seeded');

    process.exit();
});