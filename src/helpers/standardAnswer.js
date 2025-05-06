export const sucess = (response, data, statusCode = 200, message) => {
    return response.status(statusCode).json({
        sucess: true,
        data, message
    })
}

export const failure = (response, errorMessage, statusCode = 400, code = null) => {
    return response.status(statusCode).json({
        sucess: false,
        error: {
            message: errorMessage, code
        }
    })
}