import { getRepository } from 'typeorm';
import User from '../models/User';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

class UnAskAdoptionPetService {
    public async execute(user_id: any, pet_id: any): Promise<User> {

        const userRepository = getRepository(User);
        const user = await userRepository.findOne(user_id);

        const petRepository = getRepository(Pet);
        const pet = await petRepository.findOne(pet_id);

        if(!user){
            throw new AppError('Only authenticated users can unask for adoption pets', 401);
        }

        if(!pet){
            throw new AppError('Cant find the Pet', 404);
        }

        if(user.candidate_pets.includes(pet)){
            throw new AppError('Pet Already Faved', 401);
        }

        user.candidate_pets = user.candidate_pets.filter((peti) => !(peti.id === pet.id ))

        await userRepository.save(user);

        return user;
    }
}

export default UnAskAdoptionPetService;
