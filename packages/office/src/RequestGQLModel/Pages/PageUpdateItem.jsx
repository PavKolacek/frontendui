import { useEffect } from "react"
import { useAsyncThunkAction } from "../../../../dynamic/src/Hooks"
import { FillItem, UpdateForm as UpdateSubmission } from "../../DigitalSubmission/Pages/PageFillItem"
import { ReadAsyncAction } from "../../DigitalSubmission/Queries"
import { UpdateBody } from "../Mutations/Update"
import { PageItemBase } from "./PageBase"
import { StateMachineFlowVisualization } from "../../../../_template/src/StateMachineGQLModel/Components/MediumEditableContent"

import { ReadFullRequestAsyncAction } from "../Queries/ReadFullRequestAsyncAction"
import { Tree } from "../../../../_template/src/Base/Vectors/VectorAttribute"

export const EditRequest = ({ item }) => {
    // const activeSubmissionId = item?.activeSubmissionId
    // const ctx = useAsyncThunkAction(ReadFullRequestAsyncAction, {id: activeSubmissionId}, {deferred: true})
    // useEffect(() => {
    //     const run = async () => {
    //         const result = await ctx.run()
    //         console.log("EditRequest.useEffect", result)
    //     }
    //     run()
    // }, [activeSubmissionId])

    return (<>
        <Tree item={item} />
        <pre>{JSON.stringify(item, null, 2)}</pre>
        {/* {JSON.stringify(item)} */}
        {/* <StateMachineFlowVisualization item={item?.statemachine || {}} /> */}
        {/* {ctx.entity && <FillItem item={ctx.entity} />} */}
    </>
        
    )
}




export const PageUpdateItem = ({ 
    SubPage=EditRequest,
    // SubPage=() => <></>,
    queryAsyncAction=ReadFullRequestAsyncAction,
    ...props
}) => {
    return (<>
    {queryAsyncAction?.ename}
        <PageItemBase 
            SubPage={SubPage}
            ItemLayout={({children})=>children}
            queryAsyncAction={ReadFullRequestAsyncAction}
            {...props}
        />
        </>
    )
}