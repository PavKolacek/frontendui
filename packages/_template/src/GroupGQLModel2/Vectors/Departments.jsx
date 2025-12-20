import { Attribute } from "../../Base/Components/Attribute"
import { CardCapsule, Link } from "../Components"

export const Departments = ({ item }) => {
    const { subgroups } = item || {}
    const filtered = subgroups?.filter(sg => sg?.grouptype?.id === "cd49e155-610c-11ed-844e-001a7dda7110") || []
    if (filtered.length === 0) return null
    return (
        <CardCapsule item={item} title="Katedry">
            {filtered.map(fakulta => (
                <Attribute key={fakulta.id}>
                    <Link item={fakulta} />
                </Attribute>
            ))}
        </CardCapsule>
            
    )
}