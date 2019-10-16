const jwt = require('jsonwebtoken');
const homeController = require('./../controller/HomeController');

module.exports = (router) => {
    /*POST  Auth. */
    router.get('/movies/:movieName', homeController.move)
    router.get('/', (req, res) => {

        return res.status(200).send({streming: 'firts'});
    })


};
