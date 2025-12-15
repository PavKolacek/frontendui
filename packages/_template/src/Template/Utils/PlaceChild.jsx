import { useGQLEntityContext } from "./GQLEntityProvider"

export const PlaceChild = ({ Component }) => {
    const { item } = useGQLEntityContext()
    if (item)
        return (
            <Component item={item} />
        )
    return null;
}