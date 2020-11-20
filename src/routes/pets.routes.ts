import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreatePetService from '../services/CreatePetService';
import UpdatePetAvatarService from '../services/UpdatePetAvatarService';

import { getRepository } from 'typeorm';
import Pet from '../models/Pet';
import User from '../models/User';
import AppError from '../errors/AppError';


const petsRouter = Router();
const upload = multer(uploadConfig);

upload.array

petsRouter.get('/:id', async (request, response) => {
    const petRepository = getRepository(Pet);
    const userRepository = getRepository(User);

    const pet = await (await petRepository.findOne(
        {
            where: { id: request.params.id }
        }
    ));

    const usersAllData = await userRepository.find();

        const user_data = usersAllData.filter((user) => (user.id === pet.user_id ))[0];

        const has_faved_by = usersAllData.filter( (user) => user.favorite_pets.filter(
            (user_pet) => (user_pet.id === pet.id))[0]);

        const has_asked_for_adoption = usersAllData.filter( (user) => user.candidate_pets.filter(
            (user_pet) => (user_pet.id === pet.id))[0]);

        const institution = { id: pet.user_id , name: user_data.name, state: user_data.state, city: user_data.city }

  return response.json(pet);
});

petsRouter.get('/', async (request, response) => {
    const petRepository = getRepository(Pet);
    const userRepository = getRepository(User);

    const petsAllData = await (await petRepository.find()).reverse();
    const usersAllData = await userRepository.find();

    const pets = petsAllData.map( ({id, user_id, name, species, particulars, info, avatar, birth_day, gender, coat, breed}) => {

        const user_data = usersAllData.filter((user) => (user.id === user_id ))[0];

        const has_faved_by = usersAllData.filter( (user) => user.favorite_pets.filter(
            (user_pet) => (user_pet.id === id))[0]);

        const has_asked_for_adoption = usersAllData.filter( (user) => user.candidate_pets.filter(
            (user_pet) => (user_pet.id === id))[0]);

        const user_name = user_data.name;

        const institution = { id: user_id , name: user_data.name, state: user_data.state, city: user_data.city }

        let avatar_url = null;
        if (avatar) {
            avatar_url = "http://localhost:3333/files/" + avatar;
        }
        return { id, institution, has_faved_by, has_asked_for_adoption, name, species, particulars, info, avatar, avatar_url, birth_day, gender, coat, breed }
    });

  return response.json(pets);
});

petsRouter.post('/', async (request, response) => {

        const { user_id, name, species, particulars, info, coat, gender, breed, birth_day} = request.body;

        const createPet = new CreatePetService();

        const pet = await createPet.execute({
            user_id, name, species, particulars, info, coat, gender, breed, birth_day
        });

        return response.json(pet);

});

petsRouter.put('/:id', async (request, response) => {

    const petRepo = getRepository(Pet);

    const pet = await petRepo.findOne(request.params.id);

    if (!pet) {
        throw new AppError('Pet not found', 401);
    }

    await petRepo.update({ id: request.params.id}, request.body);

    const pet_updated = await petRepo.findOne(request.params.id);

    return response.json(pet_updated);

});

export default petsRouter;

petsRouter.patch('/avatar/:pet_id', upload.single('avatar'), async ( request, response ) => {
try{
    const updatePetAvatar = new UpdatePetAvatarService();
    const pet = await updatePetAvatar.execute({
        pet_id: request.params.pet_id,
        user_id: request.body.user,
        avatarFilename: request.file.filename,
    });

    return response.json(pet);
} catch (err) {
    console.log(err)
}

} );

petsRouter.delete('/:id', ensureAuthenticated  ,async (request, response) => {

    const petRepo = getRepository(Pet);

    const pet = await petRepo.findOne(request.params.id);

    if (!pet) {
        throw new AppError('Pet not found', 401);
    }

    await petRepo.remove(pet);
 return response.json({ "msg": "removed"});

});
