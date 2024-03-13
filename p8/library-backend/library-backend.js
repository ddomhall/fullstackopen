const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Book = require('./models/book.js')
const Author = require('./models/author.js')
const User = require('./models/user.js')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
type Author {
  name: String!
  id: String!
  born: Int
  bookCount: Int!
}

type Book {
  title: String!
  published: Int!
  author: Author!
  id: String!
  genres: [String!]!
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ): Book
  editAuthor(
    author: String!
    born: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) return await Book.find({author: args.author, genres: args.genre})
      else if (args.author) return await Book.find({author: args.author})
      else if (args.genre) return await Book.find({genres: args.genre})
      else return await Book.find()
    },
    allAuthors: async () => await Author.find(),
    me: (root, args, context) => {
    return context.currentUser
    }
  },

  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async (root) => await Author.findById(root.author),
    id: (root) => root.id,
    genres: (root) => root.genres,
  },

  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => await Book.find({author: root.id}).countDocuments(),
  },

  User: {
    username: (root) => root.username,
    favoriteGenre: (root) => root.favoriteGenre,
    id: (root) => root.id,
  },

  Token: {
    value: (root) => root.value
  },

  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        let author = await Author.findOne({name: args.author})
        if (!author) author = await new Author({name: args.author}).save()
        return await new Book({ title: args.title, author: author._id, published: args.published, genres: args.genres }).save()
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: {...args},
            error
          }
        })  
      }
    },

    editAuthor: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        return await Author.findByIdAndUpdate(args.author, {born: args.born}, {new: true})
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: {...args},
            error
          }
        })    
      }
    },

    createUser: async (root, args) => {
      const user = new User({...args})

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'dom' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
