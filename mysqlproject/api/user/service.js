const pool = require("../../dbconfig/dbconfig")
module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO users(name, email, password, phone, dob, address) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.name,
                data.email,
                data.password,
                data.phone,
                data.dob,
                data.address,
            ],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result);
            }
        );
    },
    getUserbyEmail: (data, callback) => {
        console.log(data);
        pool.query(
            `SELECT * FROM users WHERE email=?`,
            [data.email],
            (error, result) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, result);
            }
        );
    },
    getAllUser: callback => {
        pool.query(
            `SELECT id,name,email,phone,dob,address FROM users`,
            [],
            (error, result) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, result);
            }
        );

    },

    updateUserById: (updatedData, callback) => {
        const { name, email, phone, dob, address, id } = updatedData;
        pool.query(
            `UPDATE users SET name = ?, email = ?, phone = ?, dob = ?, address = ? WHERE id = ?`,
            [name, email, phone, dob, address, id],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result);
            }
        );
    },
    deleteUserById: (userId, callback) => {
        pool.query(
            `DELETE FROM users WHERE id = ?`,
            [userId],
            (error, result) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, result);
            }
        );
    },


}