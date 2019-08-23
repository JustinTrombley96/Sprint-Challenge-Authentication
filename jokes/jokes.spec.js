const request = require('supertest')
const db = require('../database/dbConfig')
const server = require('../api/server')

describe('jokes model', () => {

    const jokes = {
        id: 1,
        joke: "Hey Joke, I'm Dad. Nice to meet you!"
        
    }

    describe('get jokes', () => {
        it('Jokes has an id', () => {
            expect(jokes).toHaveProperty("id")
        })
        it('Jokes has a joke', () => {
            expect(jokes).toHaveProperty("joke")
        })
    })
})