const {User} = require('../models');

exports.create_user = async (req, res) => {
    try {
        const {name, email, password, age, address} = req.body;

        const user = await User.create({name, email, password, age, address})
        res.status(201).json({
            message: 'Create user successfully',
            user: user
        })
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
                message: 'Id not exist',
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
        const id = req.params.userId;
        const {name, email, password, age, address} = req.body

        const user = await User.update({name, email, password, age, address, });
        res.status(200).json({
            message: 'update user successfully',
            user: user
        });
    } catch (err) {
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
                message: 'Id already deleted',
            });
        }
        res.status(200).json({
            message: 'Delete user successfully',
            user
        });
    } catch (err) {

    }
}