import AWS from 'aws-sdk';
import {APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const create = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const status = JSON.parse(event.body);
    status.username = event.requestContext.identity.user;
    status.datetask = status.datetime + '#' + status.task.category  + '#' + status.task.title;
    const params:PutItemInput = {
        TableName: process.env.TASK_TABLE,
        Item: status
    };
    await dynamo.put(params).promise();
    delete status.datetask;
    return status;
}