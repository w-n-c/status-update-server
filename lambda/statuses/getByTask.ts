import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getByTask = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const params = {
        TableName: process.env.STATUS_TABLE,
        IndexName: process.env.STATUS_TABLE_TASK_INDEX,
        KeyConditionExpression: 'task = :task',
        ExpressionAttributeValues: {
            ':task': event.pathParameters.task
        }
    };
    const data = await dynamo.query(params).promise();
    const statuses = data.Items;
    statuses.forEach(status => {
        delete status.datetask;
    });
    return statuses;
}