/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user
      date
      total
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customer
      __typename
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productOrdersByIdAndProduct_idAndOrder_id = /* GraphQL */ `
  query ProductOrdersByIdAndProduct_idAndOrder_id(
    $id: ID!
    $product_idOrder_id: ModelProductOrderByProductCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productOrdersByIdAndProduct_idAndOrder_id(
      id: $id
      product_idOrder_id: $product_idOrder_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product_id
        order_id
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productOrdersByOrder_idAndProduct_id = /* GraphQL */ `
  query ProductOrdersByOrder_idAndProduct_id(
    $order_id: ID!
    $product_id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productOrdersByOrder_idAndProduct_id(
      order_id: $order_id
      product_id: $product_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product_id
        order_id
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const ordersByIdAndUser = /* GraphQL */ `
  query OrdersByIdAndUser(
    $id: ID!
    $user: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ordersByIdAndUser(
      id: $id
      user: $user
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      image
      price
      featured
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        price
        featured
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
