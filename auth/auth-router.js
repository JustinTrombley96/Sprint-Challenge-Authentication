const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');
const Users = require('../api/users-model.js');

const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				req.session.username = user.username;
				req.session.loggedIn = true;
				res.status(200).json({
					token,
				});
			} else {
				res.status(401).json({ message: 'You are not Jack!' });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});
function generateToken(user) {
	const payload = {
		subject    : user.id,
		username   : user.username,
		department : user.department,
	};

	const options = {
		expiresIn : '1d',
	};
	return jwt.sign(payload, secrets.jwtSecret, options);
}

router.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.status(200).json({ SAD: 'Goodbye Jack!' });
	});
});
router.get('/users', (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => res.send(err));
});

module.exports = router;
