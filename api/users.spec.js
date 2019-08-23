const request = require('supertest'); // calling it "request" is a common practice
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

	describe('register', () => {
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
	describe('login', () => {
		const user =  {
            username: "Jack",
            password: "Angel"
        }

		it('user has a property of username', () => {
			expect(user).toHaveProperty("username");
		});
		it('user is not null', () => {
			expect(user).not.toBeNull();
        });
        it('user has a property of password', () => {
			expect(user).toHaveProperty("password");
		});
	
	});
});
