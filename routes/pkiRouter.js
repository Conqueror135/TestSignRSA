const router = require('express').Router();
const {createPKI, getPKIs, sign, verify, revoke} = require('../controlers/pkiCtr');
router.get('/createPKI', async (req, res)=>{
    try {
        const pki = await createPKI();
        res.json(pki);
    } catch (error) {
        console.log(error);
    }
});
router.get('/getAll', async (req, res)=>{
  
    const pkis = await getPKIs();
    res.json(pkis);
});
router.post('/sign', async (req, res)=>{
    try {
        const body = req.body;
        const message = body.message;
        const publicKey = body.publicKey;
        const privateKey = body.privateKey;
        const result = await sign(message, publicKey, privateKey);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});
router.post('/verify', async (req, res)=>{
    const body = req.body;
    const SIGN = body.SIGN;
    const result = await verify(SIGN);
    res.send(result);
});
router.post('/revoke', async (req, res)=>{
    const body = req.body;
    const publicKey = body.publicKey;
    const result= await revoke(publicKey);
    res.send(result);
});
module.exports = router;