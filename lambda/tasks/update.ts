import AWS from 'aws-sdk';
import { APIGatewayProxyResultV2, APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

const dynamo = new AWS.DynamoDB.DocumentClient();

export const update = async ({pathParameters, body}: APIGatewayProxyWithCognitoAuthorizerEvent): Promise<APIGatewayProxyResultV2> => {
    await validateId(pathParameters);
    const task = JSON.parse(body);
    task.category = pathParameters.category;
    task.title = pathParameters.title;
    const params:PutItemInput = {
        TableName: process.env.TASK_TABLE,
        Item: task
    };
    await dynamo.put(params).promise();
    return;
}

async function validateId(task) {
    try {
        const data = await dynamo.get({
            TableName: process.env.TASK_TABLE,
            Key: task
        }).promise();
        if (!data.Item) {
            throw new Error('[404] Not Found');
        }
    } catch (e) {
        console.error('[500] Internal Error', e);
        throw e;
    }
}