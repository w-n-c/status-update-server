import AWS from 'aws-sdk';
import {APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { getKeyFromUserAndDate, remove } from './utils';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const replace = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    let key = await getKeyFromUserAndDate(event.pathParameters);
    await remove(key);
    const status = JSON.parse(event.body);
    status.datetask = status.datetime + '#' + status.task.category  + '#' + status.task.title;
    const params:PutItemInput = {
        TableName: process.env.TASK_TABLE,
        Item: status
    };
    await dynamo.put(params).promise();
    delete status.datetask;
    return status;
}