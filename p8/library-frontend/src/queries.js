import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}`

export const ME = gql`
query Me {
  me {
    favoriteGenre
    id
    username
  }
}`

export const FAVORITE_BOOKS = gql`
query FavoriteBooks {
  me {
    favoriteGenre
  }
  allBooks {
    title
    genres
    published
    id
    author {
      name
    }
  }
}`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}`

export const EDIT_AUTHOR = gql`
mutation editAuthor($author: String!, $born: Int!) {
  editAuthor(
    author: $author,
    born: $born
  ) {
    name
    born
  }
}`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}`
