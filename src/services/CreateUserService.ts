import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    name : string;
    type: string;
    phone_type: string;
    phone: string;
    info: string;
    email: string;
    birthday: string;
    street: string;
    complement: string;
    number: string;
    neightborhood: string;
    city: string;
    state: string;
    zipcode: string;
    social_id: string;
    social_id_type: string;
    password: string;
}

class CreateUserService {
    public async execute({name, type = 'adopter', phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type = 'cpf', password}: Request): Promise<User>{
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: {email},
        });
        if (checkUserExists){
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            type,
            phone_type,
            phone,
            info,
            email,
            birthday,
            street,
            complement,
            neightborhood,
            number,
            city,
            state,
            zipcode,
            social_id,
            social_id_type,
            password: hashedPassword,

        });
        try{
            await usersRepository.save(user);
        } catch (err) {
            console.log(err);
        }


        return user;
    }
}

export default CreateUserService;
