/* eslint-disable fp/no-class */
import { User as DatabaseUser, Flag as DatabaseFlag } from "@prisma/client";
import { Int, ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Sample {
    @Field(() => String)
    hello!: string;
}

@ObjectType()
export abstract class DatabaseModel {
    @Field(() => Int)
    id!: number;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date | null;

    @Field(() => Date, { nullable: true })
    createdAt?: Date | null;
}

@InputType()
export class SortInput {
    @Field({ nullable: true })
    field?: string;

    @Field({ nullable: true })
    order?: string;
}

@InputType()
export class SearchInput {
    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;

    @Field(() => SortInput, { nullable: true })
    sort?: SortInput;
}

@ObjectType()
export class User extends DatabaseModel implements Partial<DatabaseUser> {
    @Field(() => String)
    givenName!: string;

    @Field(() => String)
    familyName!: string;

    @Field(() => String)
    emailAddress!: string;
}

@ObjectType()
export class Flag extends DatabaseModel implements Partial<DatabaseFlag> {
    @Field(() => String)
    flagName!: string;

    @Field(() => Boolean)
    isOn!: boolean;

    @Field(() => String)
    description?: string | null | undefined;

    @Field(() => String)
    env?: string | null | undefined;
}

@InputType()
export class SearchUsersInput extends SearchInput {
    @Field(() => [Int], { nullable: true })
    ids?: number[] | undefined;

    @Field(() => [String], { nullable: true })
    givenNames?: string[] | undefined;

    @Field(() => [String], { nullable: true })
    familyNames?: string[] | undefined;

    @Field(() => [String], { nullable: true })
    emailAddresses?: string[] | undefined;
}