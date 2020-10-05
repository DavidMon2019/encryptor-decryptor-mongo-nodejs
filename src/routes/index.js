const express = require('express');
const router = express.Router();
const User = require('../model/usuario');

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';


router.get('/', async (req, res) => {
    const user = await User.find();
    res.render('index', {
        user
    });
});

router.post('/add', async (req, res, next) => {
    const user = new User(req.body);
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(req.body.password, 'utf8', 'hex')
    crypted += cipher.final('hex');
    user.password_aes = crypted;

    await user.save();
    console.log(user);
    res.redirect('/');
});

function desencriptar() {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(req.body.password_aes, 'hex', 'utf8')
    dec += decipher.final('utf8');
    document.getElementById('password').innerHTML = ' <textarea id="password" class="form-control" type="password" name="password" placeholder="Password" readonly >\n' +
        '\n' + ' doc' +
        ' </textarea>';
}

router.get('/turn/:id', async (req, res, next) => {
    let {id} = req.params;
    const user = await User.findById(id);
    user.status = !user.status;
    await user.save();
    res.redirect('/');
});

router.get('/edit/:id', async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    res.render('edit', {user});
});

router.post('/edit/:id', async (req, res, next) => {
    const {id} = req.params;
    const cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(req.body.password, 'utf8', 'hex')
    crypted += cipher.final('hex');
    req.body.password_aes = crypted;
    console.log(req.body.password_aes);

    await User.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
    let {id} = req.params;
    await User.remove({_id: id});
    res.redirect('/');
});

module.exports = router;
