const AuthService = require('../services/AuthService');

module.exports = {
    login(req, res) {
        console.log("Auth Controller : login ...");
        res.render('user/login');
    },
    async auth(req, res){
        console.log("Auth Controller : auth ...");

        console.log('-->',req.session)
        console.log('Cookies: ', req.cookies)
        console.log('Signed Cookies: ', req.signedCookies);

        console.log('body-->',req.body)
        const loggedIn = await AuthService.login(req.body);
        //req.session.user = user; //----> here do some logic
        if(loggedIn){
            res.redirect('/api/litter/new');
        }
    }
}