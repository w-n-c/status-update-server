import AWS from 'aws-sdk';
import {APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { getStatusFromUserAndDate, remove } from './utils';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const update = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    let status = await getStatusFromUserAndDate(event.pathParameters);
    await remove(status);
    status = {
        ...status,
        ...JSON.parse(event.body)
    };
    status.datetask = status.datetime + '#' + status.task.category  + '#' + status.task.title;
    const params:PutItemInput = {
        TableName: process.env.TASK_TABLE,
        Item: status
    };
    await dynamo.put(params).promise();
    delete status.datetask;
    return status;
}