import { AppDataSource } from "../../data-source";
import { User } from "../../entites/User";

const userRepository = AppDataSource.getRepository(User);

const getUser = async (id: Number): Promise<User> => {
  const user = await userRepository.findOne({
    where: {
      id: Number(id),
    },
    relations: ["Permission"],
  });

  if (!user) {
    throw {
      message: "Nenhum usuário encontrado",
      status: 404,
    };
  }

  return user;
};

export { getUser };
