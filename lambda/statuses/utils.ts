import AWS from 'aws-sdk';
import { QueryInput } from 'aws-sdk/clients/dynamodb';
const dynamo = new AWS.DynamoDB.DocumentClient();

function getValuesFromUserAndDate(expression = '') {
    return async function(pathParams) {
        const { id: username, datetime} = pathParams;
        try {
            let params:QueryInput = {
                TableName: process.env.STATUS_TABLE,
                KeyConditionExpression: 'username = :username and datetask contains :datetask',
                ExpressionAttributeValues: {
                    ':username': username,
                    ':datetask': datetime
                },
            };
            if (expression) params.ProjectionExpression = expression
            const data = await dynamo.query(params).promise();
            if (!data.Items || data.Count > 1) {
                throw new Error('[404] Not Found');
            } else {
                return data.Items[0];
            }
        } catch (e) {
            console.error('[500] Internal Error', e);
            throw e;
        }
    }
}
export const getKeyFromUserAndDate = getValuesFromUserAndDate('username, datetask');
export const getStatusFromUserAndDate = getValuesFromUserAndDate();

export async function remove(key) {
    try {
        const params = {
            TableName: process.env.STATUS_TABLE,
            Key: key
        };
        await dynamo.delete(params).promise();
    } catch (e) {
        console.error('[500] Internal Error', e);
        throw e;
    }
}