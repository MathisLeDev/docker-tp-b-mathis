import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne, OneToMany,
} from "typeorm";
import {Quote} from "./Quote";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") // Utilisation d'UUID pour correspondre à `id string`
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Quote, (quote) => quote.user, {onDelete: "CASCADE"})
    quotes: Quote[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
