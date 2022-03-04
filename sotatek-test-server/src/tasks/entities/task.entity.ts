import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum Priority{
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    dueDate: Date;

    @Column({type:"enum",enum:Priority})
    priority:Priority;

    @Column({default:false})
    isDone: boolean;
}
