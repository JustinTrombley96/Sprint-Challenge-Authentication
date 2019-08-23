const request = require('supertest'); // calling it "request" is a common practice
const Resources = require('../api/users-modal');
const db = require('../database/dbConfig');
const server = require('./server');

describe('users model', () => {
	// http calls made with supertest return promises, we can use async/await if desired
	beforeEach(async () => {
		await db('users').truncate();
	});

	const user = {
		id       : 1,
        username : 'Jack',
        password : 'Angel'
	};

	describe('add', () => {
		it('user is not empty', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('user is not null', () => {
			expect(user).not.toBeNull();
		});

		it('should add the provided user into the db', async () => {
			await request(server).post('/api/auth/register').send({
                username : 'Jack',
                password : 'Angel'
			});
			const users = await db('users');
			expect(users).toHaveLength(1);
		});
    });
})
// 	describe('destroy', () => {
// 		const id = 5;

// 		it('id is a number', () => {
// 			expect(id).not.toBeNaN();
// 		});
// 		it('id is not null', () => {
// 			expect(id).not.toBeNull();
// 		});
// 		it('should remove resource', async () => {
// 			await request(server).post('/api/create').send({ resource: 'ResourceA' });
// 			await request(server).post('/api/create').send({ resource: 'ResourceB' });
// 			await request(server).delete('/api/resources/1');
// 			const resources = await db('resources');
// 			expect(resources).toHaveLength(1);
// 		});
// 	});
// });
