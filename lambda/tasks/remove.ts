import AWS from 'aws-sdk';
import { APIGatewayProxyResultV2, APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const remove = async (event: APIGatewayProxyWithCognitoAuthorizerEvent): Promise<APIGatewayProxyResultV2> => {
    const params = {
        TableName: process.env.TASK_TABLE,
        Key: {
            category: event.pathParameters.category,
            title: event.pathParameters.title,
        }
    };
    await dynamo.delete(params).promise();
    return;
}
