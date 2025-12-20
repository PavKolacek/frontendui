
import { BaseUI } from "../../../Base"
import { Attribute } from "../../../Base/Components/Attribute"
import { useGQLEntityContext } from "../../../Base/Helpers/GQLEntityProvider"
import { MediumCardScalars } from "../../../Base/Scalars/ScalarAttribute"
import { MediumCardVectors } from "../../../Base/Vectors/VectorAttribute"
import { CardCapsule, LargeCard, Link } from "../../Components"
import { Faculties } from "../../Vectors/Faculties"
import { GroupRoles } from "../../Vectors/GroupRoles"

export const PageUniverzita = ({...props}) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    return (
        <LargeCard item={item} {...props} >
            PageUniverzita
            {/* <GroupRoles item={item} />
            <Faculties item={item} /> */}
            <MediumCardScalars item={item} />
            <MediumCardVectors item={item} />
        </LargeCard>        
    )    
}