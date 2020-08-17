import AWS from 'aws-sdk';
import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { getStatusFromUserAndDate } from './utils';

export const getByDate = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const usernames = await getAllUsernames();
    const inputs = usernames.map(username => ({username, datetime: event.pathParameters.date}));
    const datum = await Promise.all(inputs.map(input => getStatusFromUserAndDate(input)));
    const statuses = datum.flatMap( data => data.Items ? data.Items : data);
    statuses.forEach(status => {
        delete status.datetask;
    });
    return statuses;
}

async function getAllUsernames() {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    const data = await cognito.listUsers({
        UserPoolId: 'us-east-2_1EqvjhRsp',
        AttributesToGet: [''],
        Limit: 60
    }).promise();
    return data.Users.map((user) => user.Username);
}