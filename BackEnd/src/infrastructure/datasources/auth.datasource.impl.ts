import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain/';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;


export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) { }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {
            //1. Check if user exists
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.badRequest('User or password incorrect');

            //2. Compare the password
            const isMatching = this.comparePassword(password, user.password);
            if (!isMatching) throw CustomError.badRequest('User or password incorrect');

            //3. Map the data to UserEntity
            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { firstName, lastName, email, password } = registerUserDto;
        
        try {
            //1. Check if email is already registered
            const userExists = await UserModel.findOne({ email });
            if (userExists) throw CustomError.badRequest('User already exists');
            
            
            //2. Encrypt the password   
            const user = await UserModel.create({
                firstName,
                lastName,
                email,
                password: this.hashPassword(password),
            });

            //3. Save the user to the database
            await user.save();

            //4. Map the data to UserEntity
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }
}