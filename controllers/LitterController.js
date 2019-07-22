const LitterService = require('../services/LitterService');

module.exports = {
    new(req, res, next) {
        console.log('-->new');
        res.render('litter/new');
    },
    create(req, res, next) {
            //we will use the following way to wrapping up litter object until we use (body-barser)
        const litter = prepareLitter(req.body);

        LitterService.create(litter)
            .then(result => {
                result.pipe(res);
                result.end();
            })
            .catch(err => {
                //res.json(err.message);
                res.render('error', { err });
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
    edit(req, res, next) {
        LitterService.edit(req.params.id).then(litter => {
            res.render('litter/edit', { litter });
        });
    },
    update(req, res, next) {
        const litter = prepareLitter(req.body);

        LitterService.update(req.params.id, litter)
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
    search(req, res, next) {
        res.render('litter/search');
    },
    find(req, res, next) {
        LitterService.search(req.body)
            .then(litters => {
                //res.json(result);
                res.render('litter/search', { litters });
            })
            .catch(err => {
                res.json(err.message);
            });
    }
};

function prepareLitter(bodyObj) {
    const {
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
        } = bodyObj,
        litter = {
            //user,
            dealer,
            destination,
            machineData: {
                model,
                chassisNo,
                motorNo,
                manufactureYear,
                color
            },
            customerData: {
                name,
                nationalId,
                address,
                city
            }
        };

    litter.user = global.userId; //it's temp. before applying the login api

    return litter;
}
