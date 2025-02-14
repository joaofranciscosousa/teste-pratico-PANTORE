import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  Not,
} from "typeorm";
import { Permission } from "./Permission";
import { IsString, validateOrReject, IsNotEmpty } from "class-validator";
import bcrypt from "bcrypt";
import { userLocale } from "../locales";
import { AppDataSource } from "../data-source";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ length: 255, nullable: false, type: "varchar" })
  @IsString({
    message: `O campo ${userLocale.attributes.nome} deve ser do tipo string`,
  })
  @IsNotEmpty({
    message: `O campo ${userLocale.attributes.nome} não pode ser vazio`,
  })
  nome: string;

  @Column({ length: 255, nullable: false, unique: true, type: "varchar" })
  @IsString({
    message: `O campo ${userLocale.attributes.email} deve ser do tipo string`,
  })
  @IsNotEmpty({
    message: `O campo ${userLocale.attributes.email} não pode ser vazio`,
  })
  email: string;

  @Column({ length: 255, nullable: false, type: "varchar" })
  @IsString({
    message: `O campo ${userLocale.attributes.senha} deve ser do tipo string`,
  })
  @IsNotEmpty({
    message: `O campo ${userLocale.attributes.senha} não pode ser vazio`,
  })
  senha: string;

  @ManyToOne(() => Permission, (permission) => permission.user, {
    nullable: false,
  })
  @Column({ type: "int" })
  permission: Permission | number;

  // HOOKS
  @BeforeInsert()
  async beforeInsert() {
    await validateOrReject(this);
    await this.hashPassword();
    await this.isUniqueEmail(this.email);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    await validateOrReject(this);
    await this.isUniqueEmail(this.email, this.id);
    if (this.senha) {
      await this.hashPassword();
    }
  }

  private async hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.senha = bcrypt.hashSync(this.senha, salt);
  }

  private async isUniqueEmail(email: string, id?: number) {
    const userRepository = AppDataSource.getRepository(User);
    const duplicatedRecord = await userRepository.findOne({
      where: { email },
    });

    if (duplicatedRecord && id !== this?.id)
      throw `O ${userLocale.attributes.email} já está em uso`;
  }
}
