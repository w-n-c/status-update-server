import { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "lambda",
    // app and org for use with dashboard.serverless.com
  },
  app: "status-update",
  org: "newellwm",
  frameworkVersion: ">=1.72.0",
  custom: {
    webpack: { webpackConfig: "./webpack.config.js", includeModules: true },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack", "serverless-prune-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    versionFunctions: false,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
