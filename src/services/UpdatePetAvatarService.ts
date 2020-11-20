import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

interface Request {
    user_id: string;
    pet_id: string;
    avatarFilename: string;
}

class UpdatePetAvatarService {
    public async execute({ pet_id, user_id, avatarFilename}: Request): Promise<Pet> {
        const petRepository = getRepository(Pet);
        const pet = await petRepository.findOne(pet_id);

        if(!pet){
            throw new AppError('Only existent pets can update avatar', 401);
        }
        if(pet.avatar){
            const petAvatarFilePath = path.join(uploadConfig.directory, pet.avatar);
            const petAvatarFileExists = await fs.promises.stat(petAvatarFilePath);

            if(petAvatarFileExists){
                await fs.promises.unlink(petAvatarFilePath);
            }
        }
        pet.avatar = avatarFilename;
        await petRepository.save(pet);

        return pet;
    }
}

export default UpdatePetAvatarService;
