const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'User not found!',
    INVALID_PASSWORD: 'Incorrect login or password!',
    auth: 'Please, enter in system!',
}


export const error = (code) => {
    return ERROR_CODES[code] || 'Something was wrong! Please, try later =(';
}