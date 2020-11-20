import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateAvatarUserService from '../services/UpdateUserAvatarService';
import FavePetService from '../services/FavePetService';
import UnFavePetService from '../services/UnFavePetService';
import AskAdoptionPetService from '../services/AskAdoptionPetService';
import UnAskAdoptionPetService from '../services/UnAskAdoptionPetService';
import { getRepository } from 'typeorm';
import User from '../models/User';
import Pet from '../models/Pet';
import AppError from '../errors/AppError';

const usersRouter = Router();
const upload = multer(uploadConfig);

upload.array

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const usersAllData = await userRepository.find({relations: ["favorite_pets", "candidate_pets"]});

  const users = usersAllData.map(({id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets}) => {
    return { id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets }
  })

  return response.json(users);
});

usersRouter.post('/pendingrequests', ensureAuthenticated , async (request, response) => {
    const userRepository = getRepository(User);
    const petRepo = getRepository(Pet);
    const user_pets = await petRepo.find( { where: { user_id: request.user.id  },}, );
    const all_users = await userRepository.find();
    let final_candidates: User[] = [];
    const candidates = all_users.forEach(
        (user) => {
            user.candidate_pets.forEach((pet) => {
                user_pets.forEach((u_pet)=> {
                    if (u_pet.id === pet.id){
                        final_candidates.push(user);
                    }
                })
            });
        });

    function onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }

    var a = final_candidates;
    var unique = a.filter(onlyUnique);

   const users = unique.map(({id, name, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, favorite_pets, candidate_pets}) => {
      return { id, name, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, favorite_pets, candidate_pets }
    })

    return response.json(users);
  });


usersRouter.get('/:id', async (request, response) => {
    const userRepository = getRepository(User);
    const usersAllData = await userRepository.find({relations: ["favorite_pets", "candidate_pets"]});

    const user = await (await userRepository.findOne(
        {
            where: { id: request.params.id }
        }
    ));
    const { id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets } = user
    return response.json({ id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets });
  });

usersRouter.get('/candidate/:id', async (request, response) => {
    const userRepository = getRepository(User);
    const usersAllData = await userRepository.find({relations: ["favorite_pets", "candidate_pets"]});

    const users = usersAllData.map(({id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets}) => {
      return { id, name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, avatar, favorite_pets, candidate_pets }
    })
    let candidates = [];

    const candidate = users.map((user) => {
        const username = user.candidate_pets.map((pet) => {
                if( pet.id === request.params.id ) {
                    candidates.push(user)

                }
            });

        }
    );

    return response.json(candidates);
  });


usersRouter.post('/', async (request, response) => {

        const { name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            type,
            phone_type,
            phone,
            info,
            email,
            birthday,
            street,
            complement,
            number,
            neightborhood,
            city,
            state,
            zipcode,
            social_id,
            social_id_type,
            password
        });
        delete user.password;

        return response.json(user);

});

usersRouter.put('/:id', async (request, response) => {
    // TODO : Refatorar e Migrar lógica de checkagem para serviço

    const userRepo = getRepository(User);
    const petRepo = getRepository(Pet);

    const user = await userRepo.findOne(
        { where: { id: request.params.id},

        });

    if (!user) {
        throw new AppError('User not found', 401);
    }

    const { name, type, phone_type, phone, info, email, birthday, street, complement, number, neightborhood, city, state, zipcode, social_id, social_id_type,  password, favorite_pets, candidate_pets } = request.body;
    try{
        const fav_pet = await petRepo.findOne(favorite_pets);
        const cand_pet = await petRepo.findOne(candidate_pets);

        if (fav_pet) {
            user.favorite_pets.push(fav_pet);
        }

        if (cand_pet) {
            user.candidate_pets.push(cand_pet);
        }
    } catch (err) {
        console.log(err)
    }

    const merged = {...user,...request.body}

    if (password === ""){
        delete merged.password;
    }

    await userRepo.save(merged);

    delete merged.password;
    return response.json(merged);

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async ( request, response ) => {

        const updateUserAvatar = new UpdateAvatarUserService();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password
        return response.json(user);


} );

usersRouter.post('/fave/:id', async ( request, response ) => {
    const faveService = new FavePetService();
    const user = await faveService.execute(request.body.user.id, request.params.id);
    delete user.password;
    return response.json(user);
});

usersRouter.post('/unfave/:id', async ( request, response ) => {
    const unFavePetService = new UnFavePetService();
    const user = await unFavePetService.execute(request.body.user.id, request.params.id);
    delete user.password;
    return response.json(user);
});

usersRouter.post('/askadoption/:id', async ( request, response ) => {

    const askAdoptionService = new AskAdoptionPetService();
    const user = await askAdoptionService.execute(request.body.user.id, request.params.id);
    delete user.password;
    return response.json(user);
});

usersRouter.post('/unaskadoption/:id', async ( request, response ) => {

    const unAskAdoptionService = new UnAskAdoptionPetService();
    const user = await unAskAdoptionService.execute(request.body.user.id, request.params.id);
    delete user.password;
    return response.json(user);
});



export default usersRouter;
