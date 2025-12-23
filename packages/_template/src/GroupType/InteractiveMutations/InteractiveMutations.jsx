import { CardCapsule } from "../Components"
import { CreateLink, CreateBody } from "./Create"
import { Insert } from "./Insert"
import { Update, UpdateButton } from "./Update"

export const InteractiveMutations = ({ item }) => {
    return (
    <CardCapsule item={item} title="Nástroje">
        {/* <Update className="btn btn-outline-success" item={item} buttonLabel={"Update"} /> */}
        <UpdateButton className="btn btn-outline-success" item={item} buttonLabel={"Update"} />
        <Insert className="btn btn-outline-success" item={item} buttonLabel={"Insert"} />
        
        <CreateLink className="btn btn-outline-success" children="Nový" />

    </CardCapsule>)
}
