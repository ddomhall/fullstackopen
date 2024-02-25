const user = {
    name: 'dom',
    username: 'dom',
    password: 'dom'
}

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:5173')
    })

    it('Login form is shown', function() {
        cy.contains('log in')
        cy.contains('show')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('show').click()
            cy.get('input[placeholder="username"]').type(user.username)
            cy.get('input[placeholder="password"]').type(user.password)
            cy.get('input[value="log in"]').click()
            cy.contains('blogs')
        })

        it('fails with wrong credentials', function() {
            cy.contains('show').click()
            cy.get('input[placeholder="username"]').type(user.username)
            cy.get('input[placeholder="password"]').type('wrong pw')
            cy.get('input[value="log in"]').click()
            cy.contains('invalid username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.contains('show').click()
            cy.get('input[placeholder="username"]').type(user.username)
            cy.get('input[placeholder="password"]').type(user.password)
            cy.get('input[value="log in"]').click()
        })

        it('A blog can be created', function() {
            cy.get('input[placeholder="title"]').type(user.username)
            cy.get('input[placeholder="author"]').type(user.password)
            cy.get('input[value="add blog"]').click()
            cy.contains('title: dom')
        })

        it.only('A blog can be liked', function() {
            cy.get('input[placeholder="title"]').type(user.username)
            cy.get('input[placeholder="author"]').type(user.password)
            cy.get('input[value="add blog"]').click()
            cy.contains('like').click()
            cy.contains('expand').click()
            cy.contains('likes: 1')
        })
    })
})
