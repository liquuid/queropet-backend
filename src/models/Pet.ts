import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import User from './User';

export enum Species {
    DOG = "dog",
    CAT = "cat",
    OTHER = "other"
}

@Entity('pets')
class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: "enum",
        enum: Species,
        default: Species.OTHER
    })
    species: Species

    @Column()
    particulars: string;

    @Column()
    birth_day: string;

    @Column()
    coat: string;

    @Column()
    gender: string;

    @Column()
    breed: string;


    @Column()
    info: string;

    @Column()
    avatar: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Pet;
