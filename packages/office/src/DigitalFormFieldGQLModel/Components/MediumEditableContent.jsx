import { SelectInput } from "@hrbolek/uoisfrontend-shared"
import { Input } from "../../../../_template/src/Base/FormControls/Input"
import { Select } from "../../../../_template/src/Base/FormControls/Select"
import { formFieldRegister } from "../../DigitalFormGQLModel/Components/FormFieldRenderer"

/**
 * A component that displays medium-level content for an template entity.
 *
 * This component renders a label "TemplateMediumContent" followed by a serialized representation of the `template` object
 * and any additional child content. It is designed to handle and display information about an template entity object.
 *
 * @component
 * @param {Object} props - The properties for the TemplateMediumContent component.
 * @param {Object} props.template - The object representing the template entity.
 * @param {string|number} props.template.id - The unique identifier for the template entity.
 * @param {string} props.template.name - The name or label of the template entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `template` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const templateEntity = { id: 123, name: "Sample Entity" };
 * 
 * <TemplateMediumContent template={templateEntity}>
 *   <p>Additional information about the entity.</p>
 * </TemplateMediumContent>
 */
export const MediumEditableContent = ({ item, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    const opt = Object.values(formFieldRegister).map(v => [v?.label, v?.value])
    return (
        <>           
            {/* defaultValue={item?.name|| "Název"}  */}
            
            <Input id={"name"} label={"Jméno"} className="form-control" value={item?.name|| "name"} onChange={onChange} onBlur={onBlur} />
            <Input id={"label"} label={"Označení"} className="form-control" value={item?.label|| "Položka"} onChange={onChange} onBlur={onBlur} />
            <Input id={"labelEn"} label={"Anglické označení / label"} className="form-control" value={item?.labelEn|| "Field"} onChange={onChange} onBlur={onBlur} />
            <Input id={"description"} label={"Popis"} className="form-control" value={item?.description|| "Popisný text"} onChange={onChange} onBlur={onBlur} />
            {/* required */}
            <Input type="number" id={"order"} label={"Pořadí"} className="form-control" value={item?.order|| 1} onChange={onChange} onBlur={onBlur} />
            {/* formula */}
            {/* type_id */}
            <Select id="typeId" label={"typ"} className="form-control" value={item?.typeId || ""} onChange={onChange} onBlur={onBlur} >  
                {opt.map(o => <option value={o[1]}>{o[0]}</option>)}
            </Select>
            {JSON.stringify(item)}
            {/* backend_formula */}
            {/* flatten_formula */}
            {children}
        </>
    )
}
