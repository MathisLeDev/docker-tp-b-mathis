import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn, ManyToOne,
} from "typeorm";
import {User} from "./User";

@Entity()
export class Quote extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") // Utilisation d'UUID pour correspondre à `id string`
    id: string;

    @Column()
    quote: string;

    @ManyToOne(() => User, (user) => user.quotes, { onDelete: "CASCADE", nullable: false })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
