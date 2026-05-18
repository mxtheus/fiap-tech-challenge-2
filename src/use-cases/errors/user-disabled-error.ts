export class UserDisabledError extends Error {
    constructor() {
        super('This user is blocked and cannot log in. Contact the administrator.');
    }
}
