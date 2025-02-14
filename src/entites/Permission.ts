import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";
import { IsString, IsNotEmpty } from "class-validator";
import { permissionLocale } from "../locales";

@Entity("Permission")
export class Permission {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ length: 255, nullable: false, type: "varchar" })
  @IsString({
    message: `O campo ${permissionLocale.attributes.nome} deve ser do tipo string`,
  })
  @IsNotEmpty({
    message: `O campo ${permissionLocale.attributes.nome} não pode ser vazio`,
  })
  nome: string;

  @OneToMany(() => User, (user) => user.permission)
  user: User[];
}
