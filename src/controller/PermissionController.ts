import { Express, NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Permission } from "../entites/Permission";
import { Repository } from "typeorm";

export default (app: Express) => {
  const NAMESPACE: string = "/permission";
  const permissionRepository: Repository<Permission> =
    AppDataSource.getRepository(Permission);

  app.get(
    NAMESPACE,
    async (req: Request, res: Response, next: NextFunction) => {
      /*
        #swagger.tags = ['permission']
        #swagger.path = "/permission"
        #swagger.description = "Endpoint para listar todas as possivéis permissões (Listagem simples, sem paginação)"
        #swagger.responses[200] = {
          description: 'Lista de permissões retornada com sucesso',
        }
        #swagger.responses[500] = {
          description: "Erro interno do servidor.",
        }
      */
      try {
        const result: Permission[] = await permissionRepository.find();

        res.status(200).send(result);
      } catch (error: any) {
        next(error);
      }
    }
  );
};
