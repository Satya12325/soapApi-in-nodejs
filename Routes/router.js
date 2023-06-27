const router = require("express").Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/getnumber', async (req,res) => {
    console.log(req.body)
    try {
        
        res.send(req);
    }
    catch (err) {
        res.send(err);
    }
})

module.exports=router