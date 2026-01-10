import { CardCapsule, VectorItemsURI } from "../Components"
import { CreateButton, CreateLink } from "./Create"
import { UpdateButton, UpdateLink } from "./Update"
import { ProxyLink } from "../../../../_template/src/Base/Components/ProxyLink"
import { DeleteButton } from "./Delete"


import { CreateButton as CreateRequestButton } from "../../RequestGQLModel/Mutations/Create"


export const PageLink = ({ children, preserveHash = true, preserveSearch = true, ...props }) => {
    return (
        <ProxyLink
            to={VectorItemsURI}
            preserveHash={preserveHash}
            preserveSearch={preserveSearch}
            {...props}
        >
            {children}
        </ProxyLink>
    );
};

export const InteractiveMutations = ({ item }) => {
    return (
        <CardCapsule item={item} title="Nástroje">
            <PageLink className="btn btn-outline-success">Stránka</PageLink>
            <UpdateLink className="btn btn-outline-success" item={item}>Upravit</UpdateLink>
            <UpdateButton className="btn btn-outline-success" item={item}>Upravit Dialog</UpdateButton>
            <CreateButton className="btn btn-outline-success" rbacitem={{}}>Vytvořit nový</CreateButton>
            <DeleteButton className="btn btn-outline-danger" item={item}>Odstranit</DeleteButton>


            <CreateRequestButton
                className="btn btn-outline-warning" 
                initialItem={{
                    name: `Požadavek (${item?.name})`,
                    requesttypeId: item?.id
                }}
            >
                Vytvořit požadavek
            </CreateRequestButton>
        </CardCapsule>
    )
}
