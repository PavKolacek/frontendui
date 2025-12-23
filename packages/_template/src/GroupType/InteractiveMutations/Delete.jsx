import { useNavigate } from "react-router";
import { useGQLEntityContext } from "../../Base/Helpers/GQLEntityProvider";
import { useRoles as useRolePermission } from "../../../../dynamic/src/Hooks/useRoles"
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction";
import { LinkURI, MediumEditableContent } from "../Components";
import { Row } from "../../Base/Components/Row";
import { Col } from "../../Base/Components/Col";
import { LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { DeleteAsyncAction } from "../Queries";

export const DeleteURI = `${LinkURI.replace('view', 'delete')}`


export const DeleteLink = ({...props}) => {
    // const { can, roleNames } = useRolePermission(item, ["administrátor"])
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(CreateURI)
    }
    return (
        <button {...props} onClick={handleClick} />
    )
}

export const DeleteItem = ({children, mutationAsyncAction=DeleteAsyncAction}) => {
    const navigate = useNavigate();
    const { item } = useGQLEntityContext()
    const { can, roleNames } = useRolePermission(item, ["administrátor"])
    
    const {
        draft,
        dirty,
        loading: saving,
        onChange, 
        onBlur,
        onCancel,
        commitNow
    } = useEditAction(mutationAsyncAction, item, {
        mode: "confirm", 
        // onCommit: contextOnChange
    })

    const handleConfirm = async () => {
        const result = await commitNow(draft)
        console.log("handleConfirm", result)

        if (navigate) {
            const link = VectorItemsURI
            navigate(link, { replace: true })
        }
    }

    const handleCancel = () => {
        navigate(-1)
    }

    if (!item) return null  
    if (false) return (
        <div>
            <h1>
                Nemáte oprávnění
            </h1>
            <pre>{JSON.stringify(roleNames)}</pre>
        </div>
    )

    return (
        <Row>
            <Col></Col>
            <Col>
                <MediumEditableContent item={draft} onChange={onChange} onBlur={onBlur} >
                    {saving && <LoadingSpinner/>}
                    {children}
                    <button 
                        className="btn btn-warning form-control" 
                        onClick={handleCancel}
                        // disabled={!dirty || saving}
                    >
                        Zrušit
                    </button>
                    <button 
                        className="btn btn-primary form-control" 
                        onClick={handleConfirm}
                        // disabled={!dirty || saving}
                    >
                        Smazat
                    </button>

                </MediumEditableContent>
            </Col>
            <Col></Col>
        </Row>
    )    
}


