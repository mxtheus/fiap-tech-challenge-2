export class UserSelfDemoteError extends Error {
    constructor() {
        super('You cannot demote yourself from this role.');
    }
}
