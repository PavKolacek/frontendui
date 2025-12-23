import { LargeCard, LinkURI } from "../Components"
import { ReadAsyncAction } from "../Queries"
import { PageItemBase } from "./PageBase"
import { UpdateItem } from "../InteractiveMutations/Update"
import { useGQLEntityContext } from "../../Base/Helpers/GQLEntityProvider"

export const UpdateItemURI = `${LinkURI.replace('view', 'edit')}:id`

export const PageUpdateItem = ({ children, queryAsyncAction=ReadAsyncAction, ...props }) => {
    return (
        <PageItemBase queryAsyncAction={queryAsyncAction}>
            PageUpdateItem
            <LargeCardFromContext {...props}/>
        </PageItemBase>
    )
}

const LargeCardFromContext = ({...props}) => {
    const { item } = useGQLEntityContext()
    return (
        <LargeCard item={item}>
            <UpdateItem {...props} />
        </LargeCard>
    )
}