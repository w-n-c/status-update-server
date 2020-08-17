import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { getStatusFromUserAndDate } from './utils';

export const getByUserTask = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    let statuses = await getStatusFromUserAndDate(event.pathParameters);
    statuses.array.forEach(status => {
        delete status.datetask;
    });
    return statuses;
}