import { QueryResultRowType, sql } from 'slonik';
import { FeatureFlag, FeatureFlagType, User } from '../../generated/types';

const FLAG_ASSIGNMENT_ARRAY_REGEX = /\\"{.*?}\\"/g;
const FLAG_ASSIGNMENT_REGEX = /\(([^()]*)\)/g;

// given a query result row, return its list of assignments (feature flags or users)
const processAssignments = (row: QueryResultRowType): [any[], string] => {
    const assignmentsMatch = JSON.stringify(row).slice(1).match(FLAG_ASSIGNMENT_ARRAY_REGEX);

    let assignments: any[] = [];
    let rowWithoutAssignments = JSON.stringify(row);
    if (assignmentsMatch?.length) { // if this record has assignments
      // create string from row without the assignments for consistency in parsing timestamps
      rowWithoutAssignments = rowWithoutAssignments.replace(assignmentsMatch[0], '');

      // iterate over assignments and create corresponding assignment objects
      assignmentsMatch[0].match(FLAG_ASSIGNMENT_REGEX)!.forEach((assignmentStr) => {
        let assignmentComponents = assignmentStr.slice(1, -1).split(',');
        const assignment = {
          id: assignmentComponents[0],
          value: assignmentComponents[1],
          valueType: assignmentComponents[2]
        }

        assignments.push(assignment);
      });
    }

    return [assignments, rowWithoutAssignments];
}

// check if the specified assignment exists, and return it's value and index in the postgres array if so
const doesRecordHaveAssignment = (assignments: any[], id: any): [Boolean, number, any] => {
  let assigned = false;
  let index = 0;
  let value;

  for (const assignment of assignments) {
    index++; // postgres arrays are 1-based ;-)
    if (assignment.id === id) {
      assigned = true;
      value = assignment.value;
      break;
    }
  }

  return [assigned, index, value];
}

// given a query result row from the user table, return a user object
export const processFeatureFlagRow = (row: QueryResultRowType): FeatureFlag => {
  // parse text columns into array of string
  const stringComponents = JSON.stringify(row)
    .split('"')[3]
    .slice(1)
    .split(',');

  let flagType: FeatureFlagType = FeatureFlagType.Boolean;
  if (stringComponents[1] === "MULTI") {
    flagType = FeatureFlagType.Multi;
  }

  const [userAssignments, rowWithoutFlagAssignmentsStr] = processAssignments(row);
  const featureFlag: FeatureFlag = { // create User object from row
    id: stringComponents[0],
    type: flagType,
    userAssignments: userAssignments,
    createdAt: rowWithoutFlagAssignmentsStr.split('\\"')[1],
    updatedAt: rowWithoutFlagAssignmentsStr.split('\\"')[3],
  };

  return featureFlag;
}

// given a list of query result rows from the user table, return a list of user objects
export const processFeatureFlagRows = (rows: readonly QueryResultRowType[]): FeatureFlag[] => {
  let featureFlags: FeatureFlag[] = [];
  rows.forEach((row) => {
    const featureFlag: FeatureFlag = processFeatureFlagRow(row);
    featureFlags.push(featureFlag);
  });

  return featureFlags;
}

// given a query result row from the user table, return a user object
export const processUserRow = (row: QueryResultRowType): User => {
  // parse text columns into array of string
  const stringComponents = JSON.stringify(row)
    .split('"')[3]
    .slice(1)
    .split(',');

  const [flagAssignments, rowWithoutFlagAssignmentsStr] = processAssignments(row);
  const user: User = { // create User object from row
    id: stringComponents[0],
    givenName: stringComponents[1],
    familyName: stringComponents[2],
    emailAddress: stringComponents[3],
    featureFlagAssignments: flagAssignments,
    createdAt: rowWithoutFlagAssignmentsStr.split('\\"')[1],
    updatedAt: rowWithoutFlagAssignmentsStr.split('\\"')[3],
  }

  return user;
}

// given a list of query result rows from the user table, return a list of user objects
export const processUserRows = (rows: readonly QueryResultRowType[]): User[] => {
  let users: User[] = [];
  rows.forEach((row) => {
    const user: User = processUserRow(row);
    users.push(user);
  });

  return users;
}

// given a user and a feature flag spec, return a SQL UPDATE statement for the user if the assignment needs to be updated
export const getUpdateFeatureFlagAssignmentQuery = (user: User, flagId: string, value: string, valueType: string) => {
    const [userHasFlagAssigned, flagAssignmentIndex, flagValue] = doesRecordHaveAssignment(user.featureFlagAssignments, flagId);

    let updateFeatureFlagAssignmentQuery;
    if (userHasFlagAssigned && value !== flagValue) { // update to existing flag assignment
      updateFeatureFlagAssignmentQuery = sql`
        UPDATE users
        SET feature_flag_assignments[${flagAssignmentIndex}] = (${flagId}, ${value}, ${valueType})::feature_flag_assignment
        WHERE id = ${user.id}
        RETURNING (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at)`;
    } else if (!userHasFlagAssigned) { // add new flag assignment
      updateFeatureFlagAssignmentQuery = sql`
        UPDATE users
        SET feature_flag_assignments = array_append(feature_flag_assignments, (${flagId}, ${value}, ${valueType})::feature_flag_assignment)
        WHERE id = ${user.id}
        RETURNING (id, given_name, family_name, email_address, feature_flag_assignments, created_at, updated_at)`;
    }

    return updateFeatureFlagAssignmentQuery;
}
