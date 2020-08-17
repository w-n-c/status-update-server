import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const getByCategory = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const params = {
        TableName: process.env.TASK_TABLE,
        KeyConditionExpression: 'category = :category',
        ExpressionAttributeValues: {
            ':category': event.pathParameters.category
        }
    };
    const data = await dynamo.query(params).promise();
    return data.Items;
}