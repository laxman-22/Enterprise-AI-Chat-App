/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getChatSession = /* GraphQL */ `query GetChatSession($id: ID!) {
  getChatSession(id: $id) {
    id
    title
    createdAt
    messages {
      nextToken
      __typename
    }
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatSessionQueryVariables,
  APITypes.GetChatSessionQuery
>;
export const listChatSessions = /* GraphQL */ `query ListChatSessions(
  $filter: ModelChatSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatSessionsQueryVariables,
  APITypes.ListChatSessionsQuery
>;
export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
    id
    chatSessionID
    sender
    message
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetChatMessageQueryVariables,
  APITypes.GetChatMessageQuery
>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      chatSessionID
      sender
      message
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatMessagesQueryVariables,
  APITypes.ListChatMessagesQuery
>;
export const chatMessagesByChatSessionIDAndCreatedAt = /* GraphQL */ `query ChatMessagesByChatSessionIDAndCreatedAt(
  $chatSessionID: ID!
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  chatMessagesByChatSessionIDAndCreatedAt(
    chatSessionID: $chatSessionID
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      chatSessionID
      sender
      message
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ChatMessagesByChatSessionIDAndCreatedAtQueryVariables,
  APITypes.ChatMessagesByChatSessionIDAndCreatedAtQuery
>;
