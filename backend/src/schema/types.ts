/* eslint-disable fp/no-class */
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Sample {
    @Field(() => String)
    hello!: string;
}