const qrcode = require('qrcode-terminal');
const moment = require('moment');

const { Client, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const { LaoWeekDays, FormatPeriod } = require('./helper');
const { schedule } = require('./helper/schedule');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    var now = moment();
    var nowHour = now.hour()
    var nowMinutes = now.minutes()
    var nowSeconds = now.seconds()
    var nowDay = now.format('dddd')


    setInterval(function () {
         now = moment();
         nowHour = now.hour()
         nowMinutes = now.minutes()
         nowSeconds = now.seconds()
         nowDay = now.format('dddd')
    }, 1000)
   

    var todaySchedule = schedule.find((item)=> item.day === nowDay)

    setInterval(function () {
        if(nowHour === 6 && nowMinutes === 30 &&  todaySchedule !== ""){
            client.sendMessage("8562096106532@c.us", `ສະບາຍດີ ${FormatPeriod(nowHour)} ທຸກຄົນ! 🥳`);
            client.sendMessage("8562096106532@c.us", `🗓️ ຕາຕະລາງຮຽນ _*ວັນ${LaoWeekDays(nowDay)}*_ 📢: ${todaySchedule?.subjects?.map((subjectItem)=>(subjectItem?.subject === "" ? "" : `\n------------\n🕐 ເວລາ • _*${subjectItem?.time}*_\n ✏️ ວິຊາ • _*${subjectItem?.subject}*_\n🕯️ ຮູບແບບ • _*${subjectItem?.type}*_\n🏠 ຫ້ອງ • _*${subjectItem?.room}*_`).replace(",", " ")).join("")}`);
        }
   }, 1000)


    client.on('message', async message =>  {

        if(todaySchedule !== ""){
            if(message.body === '!today') {
                message.reply(`🗓️ ຕາຕະລາງຮຽນ _*ວັນ${LaoWeekDays(nowDay)}*_ 📢: ${todaySchedule?.subjects?.map((subjectItem)=>(subjectItem?.subject === ""  ? "" : `\n------------\n🕐 ເວລາ • _*${subjectItem?.time}*_\n ✏️ ວິຊາ • _*${subjectItem?.subject}*_\n🕯️ ຮູບແບບ • _*${subjectItem?.type}*_\n🏠 ຫ້ອງ • _*${subjectItem?.room}*_`).replace(",", " ")).join("")}`);
            }
            
            if(message.body === '!morning') {
                message.reply(`🗓️ ຕາຕະລາງຮຽນຕອນເຊົ້າ _*ວັນ${LaoWeekDays(nowDay)}*_ 📢: ${todaySchedule?.subjects?.map((subjectItem)=>(subjectItem?.subject !== ""  && (subjectItem?.time === "8:00" || subjectItem?.time === "10:00") ? `\n------------\n🕐 ເວລາ • _*${subjectItem?.time}*_\n ✏️ ວິຊາ • _*${subjectItem?.subject}*_\n🕯️ ຮູບແບບ • _*${subjectItem?.type}*_\n🏠 ຫ້ອງ • _*${subjectItem?.room}*_` : "").replace(",", " ")).join("")}`);
            }
    
            if(message.body === '!afternoon') {
                message.reply(`🗓️ ຕາຕະລາງຮຽນຕອນແລງ _*ວັນ${LaoWeekDays(nowDay)}*_ 📢: ${todaySchedule?.subjects?.map((subjectItem)=>(subjectItem?.subject !== "" && (subjectItem?.time === "13:00" || subjectItem?.time === "15:00") ? `\n------------\n🕐 ເວລາ • _*${subjectItem?.time}*_\n ✏️ ວິຊາ • _*${subjectItem?.subject}*_\n🕯️ ຮູບແບບ • _*${subjectItem?.type}*_\n🏠 ຫ້ອງ • _*${subjectItem?.room}*_` : "").replace(",", " ")).join("")}`);
            }
        }

        if(message.body === '!all') {
            message.reply(`🗓️ ຕາຕະລາງຮຽນທັງໝົດ 📢: ${schedule?.map((daySubjects)=>(`\n\n***************\n👽 _*ວັນ${LaoWeekDays(daySubjects?.day)}*_${daySubjects?.subjects?.map((subjectItem)=>(subjectItem?.subject === ""  ? "" : `\n------------\n🕐 ເວລາ • _*${subjectItem?.time}*_\n ✏️ ວິຊາ • _*${subjectItem?.subject}*_\n🕯️ ຮູບແບບ • _*${subjectItem?.type}*_\n🏠 ຫ້ອງ • _*${subjectItem?.room}*_`).replace(",", " ")).join("")}`))}`);
        }

        if(message.body === '!table') {
            const media = await MessageMedia.fromUrl('https://i.ibb.co/64QR2XH/IMG-20221024-WA0014.jpg');
            message.reply(media)
        }

        if(message.body === '!cmd') {
            console.log("msg from", message.from)
            message.reply(`!today = _ຕາຕະລາງຮຽນມື້ນີ້_ \n!morning = _ຕາຕະລາງຮຽນຕອນເຊົ້າມື້ນີ້_ \n!afternoon = _ຕາຕະລາງຮຽນຕອນບ່າຍມື້ນີ້_ \n!all = _ຕາຕະລາງຮຽນທັງໝົດ_ \n!table = _ຮູບພາບຕາຕະລາງຮຽນ_ \n\n👾 Dev - Jinji`)
        }


    });
});





client.initialize();