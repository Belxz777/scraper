const { getGroupNames } = require("./modules/allgroup.js")
const { totalSchedule } = require("./modules/getter.js")
const { getGroupSchedule } = require("./modules/groupgetter.js")
const {getMonth } = require("./modules/month.js")
const express = require('express')
const app = express()
const  cors = require('cors')
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

setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const day = time.getDate()
    const dayOfWeek = time.getDate()
    const month = getMonth(time.getMonth()+1);

    if (hours >= 8 && hours <= 13) {   
             totalSchedule(day,month).catch(() => {
            setTimeout(() => {
                const schedule = totalSchedule();
          
            }, 2000);
        });
        console.log('executing . . . ');
    
    }
}, 5000);
app.listen(
 5000, 
   () => console.log(`Server listening on port 5000.`));
//    module.exports.handler = serverless(app);