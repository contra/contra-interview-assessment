import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  userId!: string;

  @Field(() => String)
  @Column('text')
  firstName!: string;

  @Field(() => String)
  @Column('text')
  lastName!: string;

  @Field(() => String)
  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  password!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  profileTitle?: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  imageUrl?: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  tags?: string[];

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  bio?: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  verifiedAccount?: boolean;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  location?: string;

  @Field(() => [Project], { nullable: true })
  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
  })
  projects?: Project[];
}
