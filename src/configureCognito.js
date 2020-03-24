const config = {
  apiGateway: {
    REGION: "us-east-1",
    URL: process.env.REACT_APP_API_GATEWAY,
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Der8BnMLx",
    APP_CLIENT_ID: "3n3cq5mkag2kjjks3dv0k23l6"
    // IDENTITY_POOL_ID: "us-east-1:970b8455-6684-4139-a626-43a9021b654d"
  }
};

export default config;
