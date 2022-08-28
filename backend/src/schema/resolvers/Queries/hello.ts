import Logger from "roarr";
import {getAll} from "../../../db/services/userService";
import { QueryResolvers } from '../../../generated/types';

const log = Logger.child({ context: 'bin/server' });

export const resolve: QueryResolvers['hello'] = async (
  _parent,
  _args,
  // @ts-ignore
  { models },
) => {
  const all = await getAll()
  log.info(JSON.stringify(all));

  return 'it works';


};
