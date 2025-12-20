import { Attribute } from "../../Base/Components/Attribute"
import { CardCapsule, Link } from "../Components"

export const Faculties = ({ item }) => {
    const { subgroups } = item || {}
    const filtered = subgroups?.filter(sg => sg?.grouptype?.id === "cd49e153-610c-11ed-bf19-001a7dda7110") || []
    if (filtered.length === 0) return null
    return (
        <CardCapsule item={item} title="Fakulty">
            {filtered.map(fakulta => (
                <Attribute key={fakulta.id}>
                    <Link item={fakulta} />
                </Attribute>
            ))}
        </CardCapsule>
            
    )
}