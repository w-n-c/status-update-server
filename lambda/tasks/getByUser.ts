import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getByUser = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const params = {
        TableName: process.env.TASK_TABLE,
        IndexName: process.env.TASK_TABLE_USER_INDEX,
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': event.pathParameters.id
        }
    };
    const data = await dynamo.query(params).promise();
    return data.Items;
}