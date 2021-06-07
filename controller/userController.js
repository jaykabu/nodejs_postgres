const bcrypt = require('bcrypt');
const {User} = require('../models');
const jwt = require('jsonwebtoken')

module.exports.create_user = async (req, res) => {
    try {
        await bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                throw err
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    age: req.body.age,
                    address: req.body.address
                }).then(result => {
                    res.status(201).json({
                        message: 'User created successfully',
                        user: result
                    });
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}


exports.get_all_user = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(201).json({
            message: 'Get all users',
            user: user
        })
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};

exports.get_user_byId = async (req, res) => {
    try {
        const id = req.params.userId;

        const user = await User.findOne({
            where: {id}
        })
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json({
            message: 'Find user successfully',
            user
        });

    } catch (err) {

    }
};

exports.update_user = async (req, res) => {
    try {
        // console.log("updating user");
        const id = req.params.userId;
        // console.log("updating user", id);
        const {name, email, password, age, address} = req.body

        const user = await User.update(
            {name, email, password, age, address, id},
            {where: {id}}
        );
        res.status(200).json({
            message: 'update user successfully',
            user: user
        });
    } catch (err) {
        // console.log("error", err);
        res.status(500).json({
            error: err
        });
    }
}

exports.delete_user = async (req, res) => {
    try {
        const id = req.params.userId;

        const user = await User.destroy({where: {id}});
        if (!user) {
            res.status(404).json({
                message: 'User not found',
            });
        }
        res.status(200).json({
            message: 'Delete user successfully',
            user
        });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.login_user = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email}});
        console.log('user', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user.id,
                },
                "secret",
                {
                    expiresIn: "1h",
                },
            );
            res.status(200).json({
                message: 'Login user successfully',
                token: token
            })
        } else {
            res.status(500).json({
                mesaage: 'Email and password incorrect!'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'User auth failed'
        })
    }
};
