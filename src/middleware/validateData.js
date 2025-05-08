import { failure } from "../helpers/standardAnswer";

export const middleValidateBody = (schema) => (request, response, next) => {
    const { error } = schema.validate(request.body);

    if (error) {
        failure(response, { error: error.details[0].message }, 400, "ERROR_VALIDATE");
        return;
    }

    next();
}