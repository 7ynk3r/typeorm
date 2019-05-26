import { Entity, PrimaryColumn, Column } from "../../../../src";

@Entity()
export class Account {
    @PrimaryColumn()
    Id: string;

    @Column()
    Name?: string;

    @Column()
    LastActivityDate?: Date;
}
