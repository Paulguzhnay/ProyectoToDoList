import { CustomError, UserEntity } from "../../domain";


export class UserMapper {
    static userEntityFromObject(object: {[key: string]: any}) {
        const { id, _id, firstName, lastName, email, password } = object;

        if (!_id || !id) throw CustomError.badRequest('Missing id');
        if (!firstName) throw CustomError.badRequest('Missing firstName');
        if (!lastName) throw CustomError.badRequest('Missing lastName');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!password) throw CustomError.badRequest('Missing password');

        return new UserEntity(
            _id || id,
            firstName,
            lastName,
            email,
            password
        );
    }
}