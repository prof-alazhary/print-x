const LitterService = require('../services/LitterService');

module.exports = {
    new(req, res, next){
        console.log('-->new')
        res.render('litter/new')
    },
    create(req, res, next) {
        console.log('-->create')
        const user = req.user || {},
        litter = req.body;

        litter.user = user.id || 123; //for testing
        console.log(litter)

        LitterService.create(litter)
            .then(result => {
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                res.json(err.message);
            });
    },
    select(req, res, next) {
        LitterService.select(req.params.id)
            .then(result => {
                //res.json(result);
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                res.json(err.message);
            });
    },
    update(req, res, next) {
        LitterService.update(req.params.id, req.body)
            .then(result => {
                res.json(result);
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
    search(req, res, next) {
        LitterService.search(req.body)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err.message);
            });
    }
};
