var express = require('express');
var router = express.Router();

var database = require('..database');
const { route } = require('.');

router.get('/', function(req, res, next) {
    res.render('index', {title:'Express', session : req.session })
});


router.post('/login', function (request, response, next) {
    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if (user_email_address && user_password) {
        
        query = `
        SELECT * FROM user_login 
        WHERE user_email="${user_email_address}"`;

        database.query(query, function (error, data) {

            if (data.length > 0) {

                for(var count = 0; count < data.length; count++){

                    if (data[count].user_password == user_password) {

                        request.session.user_id = data[count].user_id;
                        
                        response.redirect('/');

                    }else{
                        alert('Wrong Password')
                    }
                }
            }
            else{
                alert('Incorrect Email');
            }
        })

    } else {
    
        alert('Please Enter Email Address and Password Details');

    }
})

router.get('/logout', function (request, response, next) {
    
    request.session.destroy();
    
    response.redirect('/');

})

module.exports = router;