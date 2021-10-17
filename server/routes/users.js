var express = require('express');
var router = express.Router();
const api = require('../DAL/user-api');



/* GET users listing. */
router.post('/signup', async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const addNewUser = await api.newUser(name, email, password);
    res.status(200).json(addNewUser);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
  // res.send('respond with a resource');
});



router.post('/login', async function (req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.json({ error: 'email or password incorrect' });
      return;
    }

    const result = await api.login(email, password);
    console.log("result", result);
    if (result) {
      res.status(200).json(result);
    }
    else res.json({ error: 'email or password incorrect' });
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
});


module.exports = router;
