export class UserWithoutPrivileges extends Error {
    constructor() {
        super('You do not have the privileges to perform this action');
    }
}
