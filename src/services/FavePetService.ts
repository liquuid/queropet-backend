import { getRepository } from 'typeorm';
import User from '../models/User';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

class FavePetService {
    public async execute(user_id: any, pet_id: any): Promise<User> {

        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        const petRepository = getRepository(Pet);
        const pet = await petRepository.findOne(pet_id);

        if(!user){
            throw new AppError('Only authenticated users can fave pets', 401);
        }

        if(!pet){
            throw new AppError('Cant find the Pet', 404);
        }
        if(user.favorite_pets.includes(pet)){
            throw new AppError('Pet Already Faved', 401);
        }
        const merged = {
            ...pet,
            ...{ "avatar_url": `https://localhost:3333/files/${pet.avatar}`}
        };
        user.favorite_pets.push(merged);
        await userRepository.save(user);

        return user;
    }
}

export default FavePetService;
