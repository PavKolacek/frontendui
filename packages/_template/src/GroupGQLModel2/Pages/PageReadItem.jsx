import { useGQLEntityContext } from "../../Base/Helpers/GQLEntityProvider"
import { MediumCardScalars } from "../../Base/Scalars/ScalarAttribute"
import { MediumCardVectors } from "../../Base/Vectors/VectorAttribute"
import { LargeCard } from "../Components"
import { ReadAsyncAction } from "../Queries"
import { PageBase } from "./PageBase"
import { PageFakulta } from "./SpecificPages/Fakulta"
import { PageKatedra } from "./SpecificPages/Katedra"
import { PageUniverzita } from "./SpecificPages/Univerzita"

const register = {
    "fakulta": PageFakulta,
    "katedra": PageKatedra,
    "univerzita": PageUniverzita
}

const Default = ({...props}) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    return (
        <LargeCard item={item} {...props} >
            <MediumCardScalars item={item} />
            <MediumCardVectors item={item} />
        </LargeCard>        
    )    
}

export const PageReadItem = ({ children, queryAsyncAction=ReadAsyncAction, ...props }) => {
    return (
        <PageBase queryAsyncAction={queryAsyncAction}>
            <Read {...props} />
        </PageBase>
    )
}

const Read = ({...props}) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    const SpecificPage = register[item?.grouptype?.name] || Default
    return (
        <SpecificPage item={item} {...props} >
            
        </SpecificPage>        
    )    
}

