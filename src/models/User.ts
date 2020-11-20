import Pet from './Pet'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';

export enum UserType {
    ADOPTER="adopter",
    INSTITUTION="institution"
}

export enum PhoneType {
    MOBILE = "mobile",
    HOME = "home",
    WORK = "work"
}

export enum SocialIdType {
    CNPJ = "cnpj",
    CPF = "cpf"
}

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.ADOPTER,
        nullable: true
    })
    type: UserType

    @Column({
        type: "enum",
        enum: PhoneType,
        default: PhoneType.MOBILE,
        nullable: true
    })
    phone_type: PhoneType;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    info: string;

    @Column({
        type: "timestamp",
        nullable: true
    })
    birthday: string;

    @Column({nullable: true})
    street: string;

    @Column({nullable: true})
    number: string;
    isNullable: true;

    @Column({nullable: true})
    complement: string;

    @Column({nullable: true})
    neightborhood: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    state: string;

    @Column({nullable: true})
    zipcode: string;

    @Column({nullable: true})
    social_id: string;

    @Column({
        type: "enum",
        enum: SocialIdType,
        default: SocialIdType.CNPJ,
        nullable: true
    })
    social_id_type: SocialIdType;

    @Column()
    email: string;

    @Column({nullable: true})
    avatar: string;

    @Column()
    password: string;

    @ManyToMany(type => Pet, {cascade:  ['insert', 'update'],  eager: true })
    @JoinTable()
    favorite_pets: Pet[];

    @ManyToMany(type => Pet , {cascade:  ['insert', 'update'],  eager: true })
    @JoinTable()
    candidate_pets: Pet[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default User;
