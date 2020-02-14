module.exports = async function (req, res, next){
   
    // console.log("Auth Controller : auth ...");
    // console.log('-->',req.session)
    // console.log('Cookies: ', req.cookies)
    // console.log('Signed Cookies: ', req.signedCookies);
    // console.log('body-->',req.body)

    const loggedIn = await AuthService.login(req.body);

    (loggedIn){
        next()
    }else{
        res.redirect('/api/auth/login');
    }
    //req.session.user = user; //----> here do some logic
}