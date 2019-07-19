const LitterService = require('../services/LitterService');

module.exports = {
    new(req, res, next) {
        console.log('-->new');
        res.render('litter/new');
    },
    create(req, res, next) {
        console.log('-->create');
        const user = req.user || {},
        //we will use the following way to wrapping up litter object until we use (body-barser) 
            {
                //user,
                dealer,
                destination,
                model,
                chassisNo,
                motorNo,
                manufactureYear,
                color,
                name,
                nationalId,
                address,
                city
            } = req.body,
            litter = {
                //user,
                dealer,
                destination,
                machineData: {
                    model,
                    chassisNo,
                    motorNo,
                    manufactureYear,
                    color,
                },
                customerData: {
                    name,
                    nationalId,
                    address,
                    city
                },
            };

        litter.user = user.id || global.userId; //it's temp. before applying the login api
        console.log('--->body',req.body);
        console.log('--->litter:',litter);


        LitterService.create(litter)
            .then(result => {
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                //res.json(err.message);
                res.render('error',{err})
            });
    },
    select(req, res, next) {
        LitterService.select(req.params.id)
            .then(result => {
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                res.json(err.message);
            });
    },
    edit(req, res, next){
        LitterService.edit(req.params.id)
        .then(litter=>{
            res.render('litter/edit',{litter})
        })
    },
    update(req, res, next) {
        LitterService.update(req.params.id, req.body)
            .then(result => {
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                res.json(err.message);
            });
    },
    delete(req, res, next) {
        LitterService.delete(req.params.id)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err.message);
            });
    },
    search(req,res,next) {
        res.render('litter/search');
    },
    find(req, res, next) {
        LitterService.search(req.body)
            .then(litters => {
                //res.json(result);
                res.render('litter/search',{litters});
            })
            .catch(err => {
                res.json(err.message);
            });
    }
};