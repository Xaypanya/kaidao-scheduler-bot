const qrcode = require('qrcode-terminal');
const moment = require('moment');

const { Client, LocalAuth } = require('whatsapp-web.js');
const { LaoWeekDays } = require('./helper');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    const d = new Date();
    let day = d.getDay();

    console.log("date=>", d)
    console.log("day==>", day)
    client.on('message', message => {
        if(message.body === '!ping') {
            client.sendMessage("120363046118887313@g.us", 'pong');
            console.log("msg from ==>",message.from);
        }
    });

    console.log("hour",moment().hour())
    client.sendMessage("120363046118887313@g.us", `ສະບາຍດີ  ${LaoWeekDay(moment(d).format('dddd'))}`);
});





client.initialize();