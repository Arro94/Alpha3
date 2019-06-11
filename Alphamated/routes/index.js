const emailListApi = require('./EmailList');
const usersApi = require('./users');
const express = require('express');
const router = express.Router();
const winston = require('winston');
require('../logging')();
winston.info("index.js logging :0");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./../public/index.html', { title: 'Alphamated' });
});

router.use('/api/emailList', emailListApi);
router.use('/api/user', usersApi);



module.exports = router;
