
import { useGQLEntityContext } from "../../../Base/Helpers/GQLEntityProvider"
import { MediumCardScalars } from "../../../Base/Scalars/ScalarAttribute"
import { MediumCardVectors } from "../../../Base/Vectors/VectorAttribute"
import { LargeCard } from "../../Components"


export const PageKatedra = ({...props}) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    return (
        <LargeCard item={item} {...props} >
            PageKatedra
            <MediumCardScalars item={item} />
            <MediumCardVectors item={item} />
        </LargeCard>        
    )    
}