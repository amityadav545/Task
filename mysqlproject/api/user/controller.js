const bcrypt = require('bcryptjs');
const { create, getUserbyEmail, getAllUser, updateUserById, deleteUserById } = require("./service")
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        getUserbyEmail(body, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection failed',
                });
            }

            if (result && result.length > 0) {

                return res.status(409).json({
                    success: 0,
                    message: 'User already exists',
                });
            }

            const body = req.body;
            const salt = bcrypt.genSaltSync(10);
            body.password = bcrypt.hashSync(body.password, salt);



            create(body, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: 0,
                        message: 'Database connection failed',
                    });
                }

                return res.status(200).json({
                    success: 1,
                    message: 'User created successfully',
                    data: result,
                });
            });
        });
    },

    getusers: (req, res) => {
        getAllUser((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection failed',
                });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Users not found',
                });
            }

            const user = result;

            const usersWithoutPassword = result.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                dob: user.dob.toISOString().split('T')[0],
                address: user.address,
            }));

            return res.status(200).json({
                success: 1,
                message: 'Users retrieved successfully',
                data: usersWithoutPassword,
            });
        })
    },
    userLogIn: (req, res) => {
        const body = req.body;
        getUserbyEmail(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection failed',
                });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'Invalid email',
                });
            }
            const user = result[0];
            const isPasswordValid = bcrypt.compareSync(body.password, user.password);
            if (isPasswordValid) {
                const { password, ...userWithoutPassword } = user;
                const jsontoken = sign({ results: userWithoutPassword }, "amit", {
                    expiresIn: '1h'
                });

                return res.status(200).json({
                    success: 1,
                    message: 'Logged in successfully',
                    token: jsontoken,
                    data: userWithoutPassword
                });
            }
            return res.status(404).json({
                success: 0,
                message: 'Invalid password',
            });
        });
    },
    userUpdate: (req, res) => {

        const updatedUserData = req.body;


        updateUserById(updatedUserData, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection failed',
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: 'User not found',
                });
            }

            return res.status(200).json({
                success: 1,
                message: 'User updated successfully',
                data: result,
            });
        });
    },

    useDeletebyId: (req, res) => {
        const userId = req.params.userId;
        console.log("+++++++++++++++++++");
        console.log(userId);
        deleteUserById(userId, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection failed",
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: 1,
                message: "User deleted successfully",
            });
        });
    },


    userLogOut: (req, res) => {
        return res.status(200).json({
            success: 1,
            message: 'Logged out successfully',
        });
    }

}