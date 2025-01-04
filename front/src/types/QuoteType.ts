import {UserType} from "./UserType";

export type QuoteType = {
    id: string;
    quote: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserType
};
