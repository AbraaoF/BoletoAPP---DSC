var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req : any, res : any, next : any) {
  res.send({
    nome: req.body.nome,
    age: req.query.age
});
});

module.exports = router;
