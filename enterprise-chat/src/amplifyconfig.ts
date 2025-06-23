const awsConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION!,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_GRAPHQL_ENDPOINT!,
  aws_appsync_region: process.env.NEXT_PUBLIC_APPSYNC_REGION!,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_APPSYNC_AUTH_TYPE!,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID!,
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_user_pools_id: process.env.NEXT_PUBLIC_USER_POOL_ID!,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
  oauth: {},
};

export default awsConfig;
