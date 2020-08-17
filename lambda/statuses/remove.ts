import { APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';
import { remove as _remove, getKeyFromUserAndDate } from './utils';

export const remove = async (event: APIGatewayProxyWithCognitoAuthorizerEvent) => {
    const id = await getKeyFromUserAndDate(event.pathParameters);
    await _remove(id);
    return;
}