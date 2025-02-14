import { Express, NextFunction, Request, Response } from "express";
import { User } from "../entites/User";
import { AppDataSource } from "../data-source";
import { Like, Repository } from "typeorm";
import { createPagination } from "../helper/pagination";
import * as H from "../helper/controllers/userController";

export default (app: Express) => {
  const NAMESPACE: string = "/user";
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  app.post(
    NAMESPACE,
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['user']
        #swagger.path = "/user"
        #swagger.description = "Endpoint para criar um novo usuário"
        #swagger.parameters[0] = {
          in: 'body',
          name: 'body',
          required: true,
          description: 'Informações necessárias para criar um novo usuário',
          schema: {
            email: 'user@example.com',
            nome: 'João da Silva',
            senha: 'senha123',
            permission: 1
          }
        }
        #swagger.responses[201] = {
          description: 'Usuário criado com sucesso',
        }
        #swagger.responses[422] = {
          description: "Erro de validação. Campos obrigatórios ausentes ou inválidos.",
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const { email, nome, senha, permission } = req.body;

        const user: User = new User();
        user.email = email;
        user.nome = nome;
        user.senha = senha;
        user.permission = permission;

        const result: User = await userRepository.save(user);

        res.status(201).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.put(
    NAMESPACE + "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['user']
        #swagger.path = "/user/{id}"
        #swagger.description = "Endpoint para editar um usuário. Atualiza as informações de um usuário existente com base no ID fornecido."
        #swagger.parameters[0] = {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do usuário a ser editado.',
          schema: {
            type: 'integer',
            example: 1
          }
        }
        #swagger.parameters[0] = {
          in: 'body',
          name: 'body',
          required: true,
          description: 'Informações necessárias para criar um novo usuário',
          schema: {
            email: 'user@example.com',
            nome: 'João da Silva',
            senha: 'senha123',
            permission: 1
          }
        }
        #swagger.responses[200] = {
          description: 'Usuário editado com sucesso',
        }
        #swagger.responses[422] = {
          description: "Erro de validação. Campos obrigatórios ausentes ou inválidos.",
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const { id } = req.params;
        const { email, nome, senha, permission } = req.body;

        const user: User = await H.getUser(Number(id));

        user.email = email;
        user.nome = nome;
        user.senha = senha;
        user.permission = permission;

        const result: User = await userRepository.save(user);

        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.get(
    NAMESPACE,
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['user']
        #swagger.path = "/user"
        #swagger.description = "Endpoint para listar todos os usuários com paginação"
        #swagger.parameters[0] = {
          in: 'query',
          name: 'page',
          required: false,
          description: 'Número da página para paginação. Padrão é 1.',
          schema: {
            type: 'integer',
            example: 1
          }
        }
        #swagger.parameters[1] = {
          in: 'query',
          name: 'per_page',
          required: false,
          description: 'Número de itens por página. Padrão é 10.',
          schema: {
            type: 'integer',
            example: 10
          }
        }
        #swagger.parameters[2] = {
          in: 'query',
          name: 'orderBy',
          required: false,
          description: 'Campo para ordenação. Padrão é "id".',
          schema: {
            type: 'string',
            example: 'id'
          }
        }
        #swagger.parameters[3] = {
          in: 'query',
          name: 'sortBy',
          required: false,
          description: 'Direção da ordenação. Padrão é "ASC".',
          schema: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            example: 'ASC'
          }
        }
        #swagger.parameters[4] = {
          in: 'query',
          name: 'search',
          required: false,
          description: 'Campo para realizar busca por nome ou e-mail.',
          schema: {
            type: 'string',
            example: 'João'
          }
        }
        #swagger.responses[200] = {
          description: 'Lista de usuários retornada com sucesso',
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const {
          page = 1,
          per_page = 10,
          orderBy = "id",
          sortBy = "ASC",
          search,
        } = req.query;

        const pageNumber: number = parseInt(page as string);
        const perPage: number = parseInt(per_page as string);

        let filters: any = [];

        if (search) {
          filters = [
            {
              nome: Like(`%${search}%`),
            },
            {
              email: Like(`%${search}%`),
            },
          ];
        }

        const result: [User[], number] = await userRepository.findAndCount({
          where: filters,
          relations: ["Permission"],
          skip: Number(perPage * pageNumber - perPage),
          take: perPage,
          order: {
            [String(orderBy)]: sortBy,
          },
        });

        const pagination = createPagination(pageNumber, perPage, result[1]);

        res.status(200).send({ data: result[0], pagination });
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.get(
    NAMESPACE + "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['user']
        #swagger.path = "/user/{id}"
        #swagger.description = "Endpoint para buscar somente as informações de um usuário pelo ID"
        #swagger.parameters[0] = {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do usuário a ser buscado.',
          schema: {
            type: 'integer',
            example: 1
          }
        }
        #swagger.responses[200] = {
          description: 'Usuário retornado com sucesso',
        }
        #swagger.responses[404] = {
          description: "Usuário não encontrado.",
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const { id } = req.params;

        const result = await H.getUser(Number(id));

        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.delete(
    NAMESPACE + "/:id",
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['user']
        #swagger.path = "/user/{id}"
        #swagger.description = "Endpoint para deletar um usuário pelo ID"
        #swagger.parameters[0] = {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do usuário a ser excluído.',
          schema: {
            type: 'integer',
            example: 1
          }
        }
        #swagger.responses[200] = {
          description: 'Usuário excluido com sucesso',
        }
        #swagger.responses[404] = {
          description: "Usuário não encontrado.",
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const { id } = req.params;

        const result: User = await H.getUser(Number(id));

        await userRepository.remove(result);

        res.status(200).send("Usuário excluido com sucesso");
      } catch (error: any) {
        next(error);
      }
    }
  );
};
