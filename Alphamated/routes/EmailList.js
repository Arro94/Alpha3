const options = require ('./options');
const express = require('express');
const router = express.Router();

const fs = require( 'fs' );

router.post('/add', (req, res) => {
    const name = req.body.txtName;
    const email = req.body.txtEmail;
    if(!name || !email) {
        res.sendStatus(400);
        console.info('  Bad request - Request does not contain name or email');
    } else {
        const path = req.body.filePath ?
            options.assetsDir + req.body.filePath : options.emailList;
        if(!fs.existsSync(path)) {
            fs.writeFileSync(path, 'wx');
        }
        const entry = '\n' + name + ' (' + email + ')';
        fs.appendFileSync(path, entry);
        console.info('  Added ' + name + ' (' + email + ') ' + ' to the distribution list');
        res.sendStatus(204);
    }
    //res.render('./../public/contact.html', { title: 'Alphamated' });

});

// router.delete('/delete', (req, res) => {
//     const key = req.body.key;
//     if(!key) {
//         res.sendStatus(400);
//         console.info('  Bad request - No key provided with post');
//     } else if(key !== options.clearListKey) {
//         res.sendStatus(400);
//         console.info('  Bad request - Incorrect key sent');
//     } else {
//         const path = req.body.filePath ?
//             options.assetsDir + req.body.filePath : options.emailList;
//         fs.unlinkSync(path);
//         console.info('  Deleted email distribution list');
//         res.sendStatus(200);
//     }
// });

module.exports = router;
