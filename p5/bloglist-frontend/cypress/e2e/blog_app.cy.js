const user = {
    name: 'dom',
    username: 'dom',
    password: 'dom'
}

const user2 = {
    name: 'dom2',
    username: 'dom2',
    password: 'dom2'
}

describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.request('POST', 'http://localhost:3003/api/users', user2)
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
            cy.get('input[placeholder="title"]').type(user.name)
            cy.get('input[placeholder="author"]').type(user.name)
            cy.get('input[value="add blog"]').click()
            cy.contains('title: dom')
        })

        it('A blog can be liked', function() {
            cy.get('input[placeholder="title"]').type(user.name)
            cy.get('input[placeholder="author"]').type(user.name)
            cy.get('input[value="add blog"]').click()
            cy.contains('like').click()
            cy.contains('expand').click()
            cy.contains('likes: 1')
        })

        it('creator can see remove button', function() {
            cy.get('input[placeholder="title"]').type(user.name)
            cy.get('input[placeholder="author"]').type(user.name)
            cy.get('input[value="add blog"]').click()
            cy.contains('remove')
        })

        it('rmove button only viisble to creator', function() {
            cy.get('input[placeholder="title"]').type(user.name)
            cy.get('input[placeholder="author"]').type(user.name)
            cy.get('input[value="add blog"]').click()
            cy.contains('log out').click()

            cy.get('input[placeholder="username"]').type(user2.username)
            cy.get('input[placeholder="password"]').type(user2.password)
            cy.get('input[value="log in"]').click()

            cy.contains('remove').should('not.exist')
        })

        it.only('rmove button only viisble to creator', function() {
            cy.get('input[placeholder="title"]').type(user.name)
            cy.get('input[placeholder="author"]').type(user.name)
            cy.get('input[value="add blog"]').click()

            cy.get('input[placeholder="title"]').type(user2.name)
            cy.get('input[placeholder="author"]').type(user2.name)
            cy.get('input[value="add blog"]').click()

            cy.wait(1000)

            cy.get('button:contains(like)').eq(1).click()
            cy.contains('title').eq(0).should('contain', 'dom2')
        })
    })
})
