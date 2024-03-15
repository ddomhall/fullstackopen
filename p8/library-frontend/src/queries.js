import { gql } from '@apollo/client'

const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  username
  favoriteGenre
}
`

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  id
  name
  born
  bookCount
}`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  author {
    ...AuthorDetails
  }
  title
  published
  genres
  id
}
${AUTHOR_DETAILS}`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}`

export const ALL_BOOKS = gql`
query AllBooks($author: String, $genre: String){
  allBooks(author: $author, genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const ME = gql`
query Me {
  me {
    ...UserDetails
  }
}
${USER_DETAILS}`

export const FAVORITE_BOOKS = gql`
query FavoriteBooks {
  me {
    ...UserDetails
  }
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
${USER_DETAILS}`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}`

export const EDIT_AUTHOR = gql`
mutation editAuthor($author: String!, $born: Int!) {
  editAuthor(
    author: $author,
    born: $born
  ) {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
