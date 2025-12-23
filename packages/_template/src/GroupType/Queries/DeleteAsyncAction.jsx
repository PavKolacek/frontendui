import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";
import { LargeFragment } from "./Fragments";
import { createAsyncGraphQLAction2 } from "../../../../dynamic/src/Core/createAsyncGraphQLAction2";

const DeleteMutationStr = `
mutation groupTypeDelete(
    groupType: {id: $groupType_id, lastchange: $groupType_lastchange}
  ) {
    ... on GQLModelDeleteError {
      failed
      msg
      input
      Entity {
        ...Large
      }
    }
  }
}

mutation groupTypeDelete($groupType_id: UUID!, $groupType_lastchange: DateTime!) {
  groupTypeDelete(
    groupType: {id: $groupType_id, lastchange: $groupType_lastchange}
  ) {
    ...GroupTypeGQLModelDeleteError
  }
}
`
const DeleteMutation = createQueryStrLazy(`${DeleteMutationStr}`, LargeFragment)
export const DeleteAsyncAction = createAsyncGraphQLAction2(DeleteMutation)