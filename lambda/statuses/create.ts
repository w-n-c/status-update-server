import AWS, { ApiGatewayV2 } from 'aws-sdk';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';

const dynamo = new AWS.DynamoDB.DocumentClient();

export default async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    const params:PutItemInput = {
        TableName: 'cloudformation',
        Item: JSON.parse(event.body)
    }
    await dynamo.put(params)
    return event.body;
}

