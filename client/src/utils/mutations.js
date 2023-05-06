import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// SAVE_BOOK will execute the saveBook mutation.

export const SAVE_BOOK = gql`
  mutation saveBook(
    $description: String!
    $title: String!
    $bookId: ID!
    $image: String!
    $link: String!
    $author: [String!]
  ) {
    saveBook(
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
      author: $author
    ) {
      _id
      username
    }
  }
`;

// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
