const options = require ('./options');
const express = require('express');
const router = express.Router();

const fs = require( 'fs' );

router.post('/add', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    if(!name || !email) {
        res.sendStatus(400);
        console.info('  Bad request - Request does not contain name or email');
    } else {
        const path = req.body.filePath ?
            options.assetsDir + req.body.filePath : options.emailList;
        if(!fs.existsSync(path)) {
            fs.writeFileSync(path);
        }
        const entry = '\n' + name + ' (' + email + ')';
        fs.appendFileSync(path, entry);
        console.info('  Added ' + name + ' (' + email + ') ' + ' to the distribution list');

        res.sendStatus(204);
    }
});

module.exports = router;
