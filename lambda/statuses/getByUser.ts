import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getByUser = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const params = {
        TableName: process.env.STATUS_TABLE,
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': event.pathParameters.id
        }
    };
    const data = await dynamo.query(params).promise();
    const statuses = data.Items;
    statuses.forEach(status => {
        delete status.datetask;
    });
    return statuses;
}