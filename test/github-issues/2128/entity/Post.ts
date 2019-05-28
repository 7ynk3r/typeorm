import { Entity, PrimaryColumn, Column } from "../../../../src";

enum PersonOtherGeocodeAccuracyEnm {
    Address = "Address",
    NearAddress = "NearAddress",
    Block = "Block",
    Street = "Street",
    ExtendedZip = "ExtendedZip",
    Zip = "Zip",
    Neighborhood = "Neighborhood",
    City = "City",
    County = "County",
    State = "State",
    Unknown = "Unknown"
}

@Entity()
export class Account {
    @PrimaryColumn()
    Id: string;

    @Column()
    Name?: string;

    @Column()
    LastActivityDate?: Date;

    @Column()
    PersonOtherGeocodeAccuracy?: PersonOtherGeocodeAccuracyEnm
}

export enum TypeEnum {
    Existing_Business = "Existing Business",
    New_Business = "New Business"
}

@Entity()
export class Opportunity {
    @PrimaryColumn()
    Id: string;

    @Column()
    Name?: string;

    @Column({ 
        type: "simple-enum",
        enum: TypeEnum
    })
    Type: TypeEnum
}
