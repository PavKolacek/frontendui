import { useNavigate } from "react-router"
import { AbsolutePermissionGate, useRoles as useRolePermission } from "../../../../dynamic/src/Hooks/useRoles"
import { LinkURI, MediumEditableContent } from "../Components"
import { useState } from "react"
import { useEditAction } from "../../../../dynamic/src/Hooks/useEditAction"
import { Dialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { ReadItemURI } from "../Pages/PageReadItem"
import { useCallback } from "react"

export const CreateURI = LinkURI.replace('view', 'create')

export const CreateLink = ({...props}) => {
    // const { can, roleNames } = useRolePermission(item, ["administrátor"])
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(CreateURI)
    }
    return (
        <AbsolutePermissionGate roles={["superadmin"]} >
            <button {...props} onClick={handleClick} />
        </AbsolutePermissionGate>
    )
}

export const CreateButton = ({children, ...props}) => {
    const [visible, setVisible] = useState(false)
    const handleClick = (state) => () => {
        setVisible(state)
    }
    return (
        <AbsolutePermissionGate>
            <button {...props} onClick={handleClick(!visible)}>{children || "Vytvořit nový"}</button>
            {visible && <CreateDialog onOk={handleClick(false)} onCancel={handleClick(false)} />}
        </AbsolutePermissionGate>
    )
}

export const CreateDialog = ({
    title = "Editace",
    oklabel = "Ok",
    cancellabel = "Zrušit",
    onOk: handleOk,
    onCancel: handleCancel,
}) => {
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({
        id: crypto.randomUUID(),
        name: "Nový typ"
    })
    const {
        draft,
        loading: saving,
        error,
        onChange, 
        onBlur,
        commitNow
    } = useEditAction(mutationAsyncAction, newItem, {
        mode: "confirm", 
        // onCommit: contextOnChange
    })

    const handleConfirm = useCallback(async () => {
        setNewItem(prev => {
            return {...prev,
                id: crypto.randomUUID()
            }
        })
        const result = await commitNow(draft)
        console.log("handleConfirm", result)
        if (handleOk) {
            handleOk()
        } else {
            if (navigate) {
                const link = ReadItemURI.replace(':id', `${draft.id}`);
                navigate(link, { replace: true })
            }
        }
    }, [setNewItem, commitNow, handleOk, navigate])

    const handleCancel_ = useCallback(() => {
        if (handleCancel) {
            handleCancel()
        } else {
            navigate(-1)
        }
        
    },[handleCancel, navigate])

    return (
        <Dialog 
            title={title}
            oklabel={oklabel}
            cancellabel={cancellabel}
            onCancel={handleCancel_} 
            onOk={handleConfirm}
        >
            <MediumEditableContent item={draft} onChange={onChange} onBlur={onBlur} >
                {saving && <LoadingSpinner/>}
                {error && <ErrorHandler errors={error} />}
                {children}
            </MediumEditableContent>   
        </Dialog>
    )
}

export const CreateBody = ({children, mutationAsyncAction=InsertAsyncAction, ...props}) => {
    const navigate = useNavigate();
    const [ newItem, setNewItem ] = useState({
        id: crypto.randomUUID(),
        name: "Nový typ"
    })
    const {
        draft,
        dirty,
        loading: saving,
        error,
        onChange, 
        onBlur,
        onCancel,
        commitNow
    } = useEditAction(mutationAsyncAction, newItem, {
        mode: "confirm", 
        // onCommit: contextOnChange
    })

    const handleConfirm = async () => {
        const result = await commitNow(draft)
        console.log("handleConfirm", result)

        if (navigate) {
            const link = ReadItemURI.replace(':id', `${draft.id}`);
            navigate(link, { replace: true })
        }
    }

    const handleCancel = () => {
        navigate(-1)
    }

    return (
        <MediumEditableContent item={draft} onChange={onChange} onBlur={onBlur} >
            {saving && <LoadingSpinner/>}
            {error && <ErrorHandler errors={error} />}
            {children}
            <button 
                className="btn btn-warning form-control" 
                onClick={handleCancel}
                // disabled={!dirty || saving}
            >
                Zrušit změny
            </button>
            <button 
                className="btn btn-primary form-control" 
                onClick={handleConfirm}
                // disabled={!dirty || saving}
            >
                Uložit změny
            </button>

        </MediumEditableContent>        
    )    
}
