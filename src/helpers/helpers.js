export const baseUrl =
    'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2';

export const trimString = function (string, length) {
    return string.length > length ? string.substring(0, length) : string;
};
