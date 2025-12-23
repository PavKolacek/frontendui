
import { ReadPageAsyncAction } from "../Queries"
import { useInfiniteScroll } from "../../../../dynamic/src/Hooks/useInfiniteScroll"
import { Table } from "../../Base/Components/Table"
import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { LinkURI } from "../Components"
import { PageBase } from "./PageBase"


export const VectorItemsURI = LinkURI.replace('view', 'list')

export const PageVector = ({ children, queryAsyncAction=ReadPageAsyncAction }) => {
    const { items, loading, error, hasMore, sentinelRef, loadMore } = useInfiniteScroll(
        {
            asyncAction:queryAsyncAction, 
            actionParams: { skip: 0, limit: 30 }
        }
    )
    return (
        <PageBase>
            <Table data={items} />
            
            {error && <ErrorHandler errors={error} />}
            {loading && <LoadingSpinner text="Nahrávám další..." />}
            
            {hasMore && <div ref={sentinelRef} style={{ height: 80, backgroundColor: "lightgray" }} />}            
            {hasMore && <button className="btn btn-success form-control" onClick={() => loadMore()}>Více</button>}  
        </PageBase>
    )
}

