require('dotenv').config();
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const mysql = require('mysql2/promise')

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

const pool = mysql.createPool({
    host: process.env.MYSQL_SERVER,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_CONNECTION,
    timezone: '+08:00'
})

const makeQuery = (sql, pool) =>  {
    return (async (args) => {
        const conn = await pool.getConnection();
        try {
            let results = await conn.query(sql, args || []);
            if (results[0].length == 0) {
                throw new Error
            } else {return results[0]}
        }catch(err){
            console.log('no results from SQL', err);
        } finally {
            conn.release();
        }
    });
};

const checkCredentials = `SELECT user_id FROM user
where user_id=? && password=sha1(?)`

const authenticateUser = makeQuery(checkCredentials, pool);

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/authentication', async (req, res) => {
    try {
        let result
        // console.log('authenticating...', req.body)
        await authenticateUser([req.body.username, req.body.password])
            .then(result => {
                this.result = result
            })
        if (this.result === undefined) {
            throw new Error
        } else {
            res.status(200)
            res.type('application/json')
            res.send({message: 'user validated'})
        }
    } catch (e) {
        console.log('ERROR: ', e)
        res.status(401)
        res.type('application/json')
        res.send({message: 'wrong username or password'})
    }
})



app.listen(PORT, () => {
	console.info(`Application started on port ${PORT} at ${new Date()}`)
})
