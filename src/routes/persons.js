const express = require ('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/app/', (req,res) => {
    mysqlConnection.query('SELECT * FROM persons', (err,rows,fields) =>{
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/app/:id', (req, res) => {
    mysqlConnection.query(`SELECT * FROM persons WHERE id = ${req.params.id}`, (err,rows,fields) => {
        if(!err) {
            if (rows.length>0)
                res.json(rows[0]);
            else
                return res.status(404).send(`Data not found for the ID: ${req.params.id}`);
        } else {
            console.log(err);
        }
    });
});

router.post('/app/',(req, res) => {
    const {id, fullname, birth, mother, father, children} = req.body;
    const query = `CALL personsEditAdd(?, ?, ?, ?, ?, ?);`;
    if (id === 0){
        mysqlConnection.query(query, [id, fullname, birth, mother, father, children], (err, rows, fields) => {
            if(!err) {
                res.json({Status: 'Person Save'});
            } else {
                console.log(err);
            }
        });
    } else {
        res.json({Status: "The id have to be 0 for post a new person"});
    }
    
});

router.put('/app/:id',(req, res) => {
    if (req.params.id==0){
        res.json({Status: 'Person Can\'t be Updated'});
    } else {
        const {fullname, birth, mother, father, children} = req.body;
        const query = `CALL personsEditAdd(?, ?, ?, ?, ?, ?);`;
        mysqlConnection.query(query, [req.params.id, fullname, birth, mother, father, children], (err, rows, fields) => {
            if(!err) {
                res.json({Status: 'Person Updated'});
            } else {
                console.log(err);
            }
        });
    }
    
});

router.delete('/app/:id',(req,res) => {
    mysqlConnection.query(`DELETE FROM persons WHERE id = ${req.params.id}`,(err, rows, fields) => {
        if(!err && rows.affectedRows===1) {
            res.json({Status: 'Person Deleted'});
        } else {
            res.json({Status: 'The Person can\'t be Deleted'});
        }
    })
});

module.exports = router;