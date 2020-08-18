import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { getAll } from './users';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getByTask = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const users = await getAll();
    const inputs = users.map(user => ({
        TableName: process.env.TASK_TABLE,
        IndexName: process.env.TASK_TABLE_USER_INDEX,
        KeyConditionExpression: 'username = :username and title = :title',
        ExpressionAttributeValues: {
            ':username': user.username,
            ':title': event.pathParameters.title
        }
    }));

    const datum = await Promise.all(inputs.map(input => dynamo.query(input).promise()));
    return users.filter((_, i) => datum[i].Count !== 0);
}