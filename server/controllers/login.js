const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userBUS = require("../bus/user");
const { STATUS } = require("../utils/constant");
const { responseWithStatus } = require("../utils/utils");

module.exports = {
	post: async (req, res, next) => {
		const { username, password } = req.body;
		console.log(`username: ${username} pass: ${password} `)
		try {
			const user = await userBUS.findByUsername(username);
			if (!user) {
				throw "Invalid Username";
			} else {
				const isMatch = await bcrypt.compare(password, user.password);

				if (isMatch) {
					const payload = {
						id: user.id,
						username: user.username
					};
					const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
					res.cookie("jwt", token);
					responseWithStatus(res, STATUS.SUCCESS);
				} else {
					throw "Invalid password"
				}
			}
		}
		catch (err) {
			console.trace(err);
			res.json({ code: STATUS.UNAUTHORIZE.code, data: { message: err.message } });
		};
	},
};
