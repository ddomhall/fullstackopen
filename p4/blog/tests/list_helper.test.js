const listHelper = require('../utils/list_helper')

const listWithNoBlogs = []

const listWithOneBlog = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
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

const listWithSixBlogs = [
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
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
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
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(12)
    })

    test('two blogs', () => {
        expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(12)
    })
})

describe('favourite blog', () => {
    test('no blogs', () => {
        expect(listHelper.favouriteBlog(listWithNoBlogs)).toEqual(null)
    })

    test('one blog', () => {
        expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
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

describe('most blogs', () => {
    test('no blogs', () => {
        expect(listHelper.mostBlogs(listWithNoBlogs)).toEqual(null)
    })

    test('one blog', () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1
        })
    })

    test('six blogs', () => {
        expect(listHelper.mostBlogs(listWithSixBlogs)).toEqual({
            author: 'Robert C. Martin',
            blogs: 3 
        })
    })
})

describe('most likes', () => {
    test('no blogs', () => {
        expect(listHelper.mostLikes(listWithNoBlogs)).toEqual(null)
    })

    test('one blog', () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })

    test('six blogs', () => {
        expect(listHelper.mostLikes(listWithSixBlogs)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17 
        })
    })
})

