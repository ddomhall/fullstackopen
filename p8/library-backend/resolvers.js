const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const User = require('./models/user.js')
const jwt = require('jsonwebtoken')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
      return await Book.find({author: args.author, genres: args.genre}).populate('author')
      } else if (args.author) {
        return await Book.find({author: args.author}).populate('author')
      } else if (args.genre) {
      return await Book.find({genres: args.genre}).populate('author')
      } else {
      return await Book.find().populate('author')
      }
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
    bookCount: (root) => root.bookCount,
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
      let book
      try {
        if (!context.currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        let author = await Author.findOne({name: args.author})
        if (!author) author = await new Author({name: args.author, bookCount: 0}).save()

        book = new Book({ title: args.title, author: author._id, published: args.published, genres: args.genres })
        await book.save()
        author.bookCount += 1
        await author.save()
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: {...args},
            error
          }
        })  
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
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

      return await user.save()
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

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers
