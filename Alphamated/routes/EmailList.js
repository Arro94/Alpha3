const options = require ('./options');
const express = require('express');
const router = express.Router();
const winston = require('winston');
require('../logging')();

const fs = require( 'fs' );

router.post('/add', (req, res, next) => {
    winston.debug(req.baseURI + " - " + req.body + "|||| route: " + req.route);
    const name = req.body.name;
    const email = req.body.email;
    if(!name || !email) {
        res.sendStatus(400);
        winston.info('  Bad request - Request does not contain name or email');
    } else {
        const path = req.body.filePath ?
            options.assetsDir + req.body.filePath : options.emailList;
        if(!fs.existsSync(path)) {
            fs.writeFileSync(path);
        }
        const entry = '\n' + name + ' (' + email + ')';
        fs.appendFileSync(path, entry);
        winston.info('  Added ' + name + ' (' + email + ') ' + ' to the distribution list');

        res.sendStatus(204);
    }
});

module.exports = router;
