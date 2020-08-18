import AWS from 'aws-sdk';
const cognito = new AWS.CognitoIdentityServiceProvider();

export const getAll = async () => {
    const data = await cognito.listUsers({
        UserPoolId: 'us-east-2_1EqvjhRsp',
        AttributesToGet: ['email', 'family_name', 'given_name'],
        Limit: 60
    }).promise();
    const users = data.Users.map((user) => {
        let userInfo = { username: user.Username };
        user.Attributes.map(({Name, Value}) => userInfo[Name] = Value);
        return userInfo
    })
    return users;
}