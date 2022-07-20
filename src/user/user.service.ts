import { Injectable } from '@nestjs/common';
import {RegisterDto} from "./dto/register.dto";
import {RegisterUserResponse} from "../interfaces/user";
import {User} from "./user.entity";
import {hashPwd} from "../utils/hash-pwd";

@Injectable()
export class UserService {

    filter(user: User): RegisterUserResponse {
        const {id, email} = user;
        return {id, email};
    }

    async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
        const user = new User();
        user.email = newUser.email;
        user.pwdHash = hashPwd(newUser.pwd);

        if (await User.findOne({where: {email: user.email}})) {
            return {
                isSuccessful: false,
                message: `Sorry, user with email: '${user.email}' already exist! Please provide a different email.`
            }
        }
        await user.save();
        return this.filter(user);
    }
}
