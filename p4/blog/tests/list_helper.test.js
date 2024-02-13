const listHelper = require('../utils/list_helper')

const listWithNoBlogs = []
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }
]
const listWithTwoBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

describe('dummy', () => {
    test('dummy returns one', () => {
        expect(listHelper.dummy([])).toBe(1)
    })
})

describe('total likes', () => {
    test('no blogs', () => {
        expect(listHelper.totalLikes(listWithNoBlogs)).toBe(0)
    })

    test('one blog', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
    })

    test('two blogs', () => {
        expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(12)
    })
})

describe('favourite blog', () => {
    test('no blogs', () => {
        expect(listHelper.favouriteBlog(listWithNoBlogs)).toEqual()
    })

    test('one blog', () => {
        expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })

    test('two blogs', () => {
        expect(listHelper.favouriteBlog(listWithTwoBlogs)).toEqual({
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        })
    })

})
