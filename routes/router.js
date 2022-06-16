const router = require('express').Router();
const pkiRouter = require('./pkiRouter');

router.use('/pki', pkiRouter);

module.exports = router;