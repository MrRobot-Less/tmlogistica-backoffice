import User from '../models/user';
console.log('creating the user-admin');

const data = {
	email: 'admin@tmlogistica.com.br',
	name: 'Admin',
	password: 'tmadmin',
};

User.create(data)
	.then(() => {
		console.log('The admin user has been created.');
	})
	.catch(e => {
		console.error(e.message);
	});