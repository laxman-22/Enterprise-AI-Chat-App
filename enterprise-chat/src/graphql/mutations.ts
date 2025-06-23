/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChatSession = /* GraphQL */ `mutation CreateChatSession(
  $input: CreateChatSessionInput!
  $condition: ModelChatSessionConditionInput
) {
  createChatSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChatSessionMutationVariables,
  APITypes.CreateChatSessionMutation
>;
export const updateChatSession = /* GraphQL */ `mutation UpdateChatSession(
  $input: UpdateChatSessionInput!
  $condition: ModelChatSessionConditionInput
) {
  updateChatSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChatSessionMutationVariables,
  APITypes.UpdateChatSessionMutation
>;
export const deleteChatSession = /* GraphQL */ `mutation DeleteChatSession(
  $input: DeleteChatSessionInput!
  $condition: ModelChatSessionConditionInput
) {
  deleteChatSession(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChatSessionMutationVariables,
  APITypes.DeleteChatSessionMutation
>;
export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $input: CreateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  createChatMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $input: UpdateChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  updateChatMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $input: DeleteChatMessageInput!
  $condition: ModelChatMessageConditionInput
) {
  deleteChatMessage(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
