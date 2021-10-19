var express = require('express');
var router = express.Router();
const api = require('../DAL/room-api');


router.get('/:id', async function (req, res) {
    const { id } = req.params;

    try {
        const result = await api.getRoom(id);
        if (result) {
            res.status(200).json(result);
        }
        else res.json({ error: 'Room does not exist in the database' });
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});



router.get('/', async function (req, res, next) {
    try {
        const rooms = await api.getRooms();
        res.status(200).json(rooms);
    } catch (err) {
        console.log(err);
        res.json({ error: err });
    }
});

module.exports = router;
