import { AppError } from "../../dtos/error";
import jwt from 'jsonwebtoken';
import { JwtPayload, authenticateUserDTO, authenticatedObject } from "../../dtos/auth";
import User, { UserDTO } from "../../models/user";

const bcrypt = require('bcryptjs');
const secret = process.env.SECRET;

function generateToken(params: any) {
	const token = jwt.sign(params, secret, {
		expiresIn: 60 * 60 * 24 * 14 // two weeks
	});
	return token;
}

function generateSessionObject(user: UserDTO) {
	const id = user._id.toString();
	return {
		_id: id,
		email: user.email,
		name: user.name,
		token: generateToken({ id: id })
	};
}

export const AuthService = {
	register: async function(newUser: Omit<UserDTO, 'createdAt' | '_id'>, cb: (error: AppError | null, user?: authenticatedObject) => void) {
		try {
			if (await User.findOne({ email: newUser.email })) return cb(new AppError('User already registered.'));
			const user = await User.create(newUser);
			cb(null, generateSessionObject(user.toObject()));
		} catch (err) {
			cb(err as AppError);
		}
	},
	authenticate: async function({ email, password }: authenticateUserDTO, cb: (err: AppError | null, user?: authenticatedObject) => void) {
		try {
			const user = await User.findOne({ email: email }).select('+password');
			if (!user) return cb(new AppError('User not found.'));
			if (!await bcrypt.compare(password, user.password)) return cb(new AppError('The email or password incorrect.'));
			cb(null, generateSessionObject(user.toObject()));
		} catch (err) {
			cb(err as AppError);
		}
	},
	validate: function(token: string, cb: jwt.VerifyCallback<string | jwt.JwtPayload>){
		jwt.verify(token, secret, cb);
	}
}