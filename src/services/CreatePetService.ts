import { getRepository } from 'typeorm';
import Pet from "../models/Pet";
import User from "../models/User";
import AppError from '../errors/AppError';

interface Request{
    user_id: string;
    name: string;
    species: string;
    particulars: string;
    info: string;
    birth_day: string;
    coat: string;
    gender: string;
    breed: string;
}
class CreatePetService {
    public async execute({ user_id, name, species, particulars, info, birth_day, coat, gender, breed }: Request): Promise<Pet> {
        const petsRepository = getRepository(Pet);

        const pet = petsRepository.create({
            user_id,
            name,
            species,
            particulars,
            info,
            birth_day,
            coat,
            gender,
            breed
        });
        try{
        await petsRepository.save(pet);
        } catch (err) {
            console.log(err)
        }

        return pet;
    }
}

export default CreatePetService;
