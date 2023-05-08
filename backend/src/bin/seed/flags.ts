import { faker } from '@faker-js/faker';
import { sql } from 'slonik';
import { FlagModel } from '../../data/types';
import { FlagTypeEnum } from '../../generated/types';
import { JsonScalar } from '../../ResolverContextType';

export type FlagInsertModel = Pick<
  FlagModel,
  'type' | 'name' | 'value' | 'description'
>;

export function generateFlags(amount = 1): FlagInsertModel[] {
  const createFlag = () => {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const type = faker.helpers.arrayElement(Object.values(FlagTypeEnum));
    const value =
      type === FlagTypeEnum.Multi
        ? faker.helpers.arrayElement([
            faker.datatype.number(),
            faker.word.noun(),
            (faker.science.unit() as unknown) as JsonScalar,
          ])
        : faker.datatype.boolean();
    return {
      name,
      description,
      type,
      value,
    };
  };

  return Array.from({ length: amount }).map(createFlag);
}

export function getFlagsInsertSql(flags: FlagInsertModel[]) {
  const values = flags.map(
    (flag) =>
      sql`(${flag.name}, ${flag.description}, ${flag.type}, ${sql.json(
        flag.value,
      )})`,
  );
  return sql`
      INSERT INTO feature_flag (name, description, type, value)
      VALUES ${sql.join(values, sql`,`)}
    `;
}
