import { useGQLEntityContext } from "../../Base/Helpers/GQLEntityProvider"
import { MediumCardScalars } from "../../Base/Scalars/ScalarAttribute"
import { MediumCardVectors } from "../../Base/Vectors/VectorAttribute"
import { LargeCard, LinkURI } from "../Components"
import { ReadAsyncAction } from "../Queries"
import { PageItemBase } from "./PageBase"

export const ReadItemURI = `${LinkURI}:id`

/**
 * Základní obálka pro „read“ stránku entity podle `:id` z routy.
 *
 * Využívá `PageItemBase`, který zajistí:
 * - získání `id` z URL (`useParams`)
 * - načtení entity přes `AsyncActionProvider` pomocí `queryAsyncAction`
 * - vložení navigace (`PageNavbar`)
 *
 * Uvnitř provideru vykreslí `ReadWithComponent`, který si vezme načtený `item`
 * z `useGQLEntityContext()` a zobrazí ho v zadané komponentě (defaultně `LargeCard`).
 *
 * @component
 * @param {object} props
 * @param {Function} [props.queryAsyncAction=ReadAsyncAction]
 *   Async action (např. thunk) pro načtení entity z backendu/GraphQL dle `id`.
 * @param {Object<string, any>} [props]
 *   Další props předané do `ReadWithComponent` (např. `Component`, layout props).
 *
 * @returns {import("react").JSX.Element}
 */
export const PageReadItemBase = ({ queryAsyncAction=ReadAsyncAction, children, ...props }) => {
    return (
        <PageItemBase queryAsyncAction={queryAsyncAction}>
            <ReadWithComponent {...props}>
                {children}
            </ReadWithComponent>
        </PageItemBase>
    )
}

/**
 * Pomocná komponenta, která rendruje načtený `item` z `GQLEntityContext`
 * pomocí zadané obalové komponenty (`Component`).
 *
 * - Pokud `item` ještě není k dispozici (loading / nenalezeno), vrací `null`.
 * - Jinak rendruje `<Component item={item} ...props>{children}</Component>`.
 *
 * Typicky `Component` bývá karta typu `LargeCard`, ale můžeš předat libovolnou
 * prezentační komponentu, která očekává prop `item`.
 *
 * @component
 * @param {object} props
 * @param {import("react").ComponentType<any>} [props.Component=LargeCard]
 *   Komponenta, která se použije jako wrapper pro zobrazení entity.
 *   Musí akceptovat alespoň prop `item`.
 * @param {import("react").ReactNode} [props.children]
 *   Vnořený obsah, který se vloží dovnitř wrapper komponenty.
 * @param {Object<string, any>} [props]
 *   Další props, které se předají do wrapper komponenty.
 *
 * @returns {import("react").JSX.Element|null}
 */
const ReadWithComponent = ({Component=LargeCard, children, ...props}) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    return (
        <Component item={item} {...props} >
            {children}
        </Component>        
    )    
}

/**
 * Generovaný (defaultní) obsah pro stránku čtení entity.
 *
 * Vezme `item` z `GQLEntityContext` a vykreslí:
 * - libovolné `children` (typicky vlastní rozšíření)
 * - `MediumCardScalars` (skalární pole entity)
 * - `MediumCardVectors` (vztahy/kolekce entity)
 *
 * Pokud `item` není dostupný, vrací `null`.
 *
 * @component
 * @param {object} props
 * @param {import("react").ReactNode} [props.children]
 *   Dodatečný obsah vložený nad generované karty se skaláry a vektory.
 *
 * @returns {import("react").JSX.Element|null}
 */
const GeneratedContent = ({ children }) => {
    const { item } = useGQLEntityContext()
    if (!item) return null
    return (
        <>
            {children}
            <MediumCardScalars item={item} />
            <MediumCardVectors item={item} />
        </>        
    )    
}

/**
 * Hotová „read item“ stránka složená z `PageReadBase` + `GeneratedContent`.
 *
 * - `PageReadBase` zajistí načtení entity dle `:id` a základní wrapper (navbar, provider).
 * - `GeneratedContent` vykreslí `children` + generované karty (`MediumCardScalars`, `MediumCardVectors`).
 *
 * Vhodné jako defaultní detail entity, kde chceš automaticky zobrazit všechna pole
 * a zároveň umožnit doplnit vlastní obsah přes `children`.
 *
 * @component
 * @param {object} props
 * @param {import("react").ReactNode} [props.children]
 *   Vlastní doplňkový obsah (např. akční tlačítka, custom sekce).
 * @param {Function} [props.queryAsyncAction=ReadAsyncAction]
 *   Async action pro načtení entity z backendu/GraphQL.
 * @param {Object<string, any>} [props]
 *   Další props – v této kompozici se předávají do `GeneratedContent`
 *   (aktuálně je `GeneratedContent` nevyužívá, ale ponechává se pro rozšiřitelnost).
 *
 * @returns {import("react").JSX.Element}
 */
export const PageReadItem = ({ children, queryAsyncAction=ReadAsyncAction, ...props }) => {
    return (
        <PageReadItemBase queryAsyncAction={queryAsyncAction}>
            <GeneratedContent {...props}>
                {children}
            </GeneratedContent>
        </PageReadItemBase>
    )
}
