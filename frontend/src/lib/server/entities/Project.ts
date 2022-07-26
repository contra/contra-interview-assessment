import { Field, ID, InputType, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  projectId!: string;

  @Field(() => String)
  @Column('text')
  title?: string;

  @Field(() => String)
  @Column('text')
  description?: string;

  @Field(() => String)
  @Column('text', { nullable: true })
  imageUrl?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.projects)
  user!: Relation<User>;
}

@InputType()
export class ProjectInput implements Partial<Project> {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description?: string;

  @Field(() => String)
  imageUrl?: string;
}
