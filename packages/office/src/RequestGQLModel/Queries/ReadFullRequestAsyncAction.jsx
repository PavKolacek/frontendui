import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const ReadQueryStr = `
query readFullRequestById($id: UUID!) {
  readFullRequestById: requestById(id: $id) {
    ...Large
    state {
      ...RequestState
    }
    activeSubmission {
      ...RequestSubmission
    }
  }
}

fragment RequestState on StateGQLModel {
  __typename
  id
  name
  statemachine {
    ...StateMachineGQLModel
  }
}

fragment StateMachineGQLModel on StateMachineGQLModel {
  __typename
  id
  name
  states {
    __typename
    id
    name
  }
  transitions {
    __typename
    id
    name
    sourceId
    targetId
  }
}

fragment RequestSubmission on DigitalSubmissionGQLModel {
  __typename
  id
  name
  submittedSectionsAll {
    ...DigitalSubmissionSectionGQLModel
  }
  sections {
    ...DigitalSubmissionSectionGQLModel
    sections {
      ...DigitalSubmissionSectionGQLModel
      sections {
        ...DigitalSubmissionSectionGQLModel
        sections {
          ...DigitalSubmissionSectionGQLModel
          sections {
            ...DigitalSubmissionSectionGQLModel
            sections {
              ...DigitalSubmissionSectionGQLModel
            }
          }
        }
      }
    }
  }
}

fragment DigitalSubmissionSectionGQLModel on DigitalSubmissionSectionGQLModel {
  __typename
  id
  index
  stateId
  formSection {
    __typename
    name
    label
    description
    repeatableMin
    repeatableMax
    order
    fields {
      ...DigitalFormFieldGQLModel
    }
  }
  fields {
    ...DigitalSubmissionFieldGQLModel
  }
}

fragment DigitalFormFieldGQLModel on DigitalFormFieldGQLModel {
  __typename
  name
  label
  description
  required
  order
  computed
  formula
  typeId
  backendFormula
  flattenFormula
}

fragment DigitalSubmissionFieldGQLModel on DigitalSubmissionFieldGQLModel {
  __typename
  id
  value
  lastchange
  changedby {
    __typename
    id
    fullname
  }
  rbacobjectId
  field {
    ...DigitalFormFieldGQLModel
  }
}
`

const ReadQuery = createQueryStrLazy(`${ReadQueryStr}`, LargeFragment)

/**
 * An async action for executing a GraphQL query to read  entities.
 *
 * This action is created using `createAsyncGraphQLAction` with a predefined `QueryRead` query.
 * It can be dispatched with query variables to fetch data related to  entities from the GraphQL API.
 *
 * @constant
 * @type {Function}
 *
 * @param {Object} query_variables - The variables for the GraphQL query.
 * @param {string|number} query_variables.id - The unique identifier for the  entity to fetch.
 *
 * @returns {Function} A dispatchable async action that performs the GraphQL query, applies middleware, and dispatches the result.
 *
 * @throws {Error} If `query_variables` is not a valid JSON object.
 *
 * @example
 * // Example usage:
 * const queryVariables = { id: "12345" };
 *
 * dispatch(ReadAsyncAction(queryVariables))
 *   .then((result) => {
 *     console.log("Fetched data:", result);
 *   })
 *   .catch((error) => {
 *     console.error("Error fetching data:", error);
 *   });
 */
// export const ReadAsyncAction = createAsyncGraphQLAction2(ReadQuery, reduceToFirstEntity("result"))
export const ReadFullRequestAsyncAction = createAsyncGraphQLAction2(ReadQuery)
ReadFullRequestAsyncAction.ename = "ReadFullRequestAsyncAction"