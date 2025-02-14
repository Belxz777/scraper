const { getGroupNames } = require("./modules/allgroup.js")
const { totalSchedule,coupleDates } = require("./modules/getter.js")
const { getGroupSchedule } = require("./modules/groupgetter.js")
const {getMonth } = require("./modules/month.js")
const express = require('express')
const app = express()
const  cors = require('cors')
const {getWeekDay} =  require("./modules/day.js")
const serverless = require('serverless-http');
app.use(express.urlencoded({ extended: true }));
//! добавить авто фетчинг расписания 

//! учесть кейс с расписание на две даты

//& задеплоить в yandex-cloud serverless functions

// * продумать более крутой функционал
app.use(cors())
// Define middleware for all routes

// Define route for GET request on path '/'
app.get('/getScedule', async (request, response) =>{
    const res= await totalSchedule(request.query.day,request.query.month)
    response.json({ res })  
})
app.get('/getScedule/group', async (request, response) =>{
    const res= await getGroupSchedule(request.query.group,request.query.day,request.query.month)
    if (res.status) {
        return  response.status(400).json({ error: res.status });
        // Возвращаем ошибку с кодом 400
    }
    response.json(res)  
})
app.get('/groups', async (request, response) =>{
    const groups= await getGroupNames()
    response.json({ groups })  
})

// setInterval(async () => {
//     const time = new Date();
//     const hours = time.getHours();
//     const day = time.getDate();
//     const month = getMonth(time.getMonth() + 1);
//     const weekDay = getWeekDay(time.getDay());
//     if (hours >= 8 && hours <= 19) {
//         try {
//             if(weekDay == "Thursday") {
//                 const schedule = await coupleDates(day,day+1, month);
//                 console.log(schedule);
//             }
//             else if(weekDay == "Sunday"){
//                 return
//             }
//             console.log('Executing . . . ');
//             const schedule = await totalSchedule(day, month);
//             console.log(schedule);
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 console.log("Received status 400, retrying in 2 seconds...");
//                 setTimeout(async () => {
//                     try {
//                         const schedule = await totalSchedule(day, month);
//                         console.log(schedule);
//                     } catch (err) {
//                         console.error('Failed to retrieve schedule after retry:', err);
//                     }
//                 }, 2000);
//             } else {
//                 console.error('Error executing totalSchedule:', error);
//             }
//         }
//     }
// }, 10000);
app.listen(
 5000, 
   () => console.log(`Server listening on port 5000.`));
//    module.exports.handler = serverless(app);