import AWS from 'aws-sdk';
import { APIGatewayProxyResultV2, APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const replace = async (event: APIGatewayProxyWithCognitoAuthorizerEvent): Promise<APIGatewayProxyResultV2> => {
    const task = JSON.parse(event.body);
    task.category = event.pathParameters.category || task.category;
    task.title = event.pathParameters.title || task.title;
    task.username = event.requestContext.identity.user;
    const params:PutItemInput = {
        TableName: process.env.TASK_TABLE,
        Item: task
    };
    await dynamo.put(params).promise();
    return;
}
