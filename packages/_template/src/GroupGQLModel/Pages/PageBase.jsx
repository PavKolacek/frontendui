import { useParams } from "react-router"
import { AsyncActionProvider } from "../../Base/Helpers/GQLEntityProvider"
import { PlaceChild } from "../../Base/Helpers/PlaceChild"
import { PageNavbar } from "./PageNavbar"
import { ReadAsyncAction } from "../Queries"

/**
 * Base wrapper pro stránky pracující s jedním entity itemem podle `:id` z routy.
 *
 * Komponenta:
 * - načte `id` z URL přes `useParams()`
 * - sestaví minimální `item` objekt `{ id }`
 * - poskytne jej přes `AsyncActionProvider`, který zajistí načtení entity pomocí `queryAsyncAction`
 * - vloží do stránky navbar přes `PlaceChild Component={PageNavbar}`
 * - vyrenderuje `children` uvnitř provideru (tj. až v kontextu načtené entity)
 *
 * Typické použití je jako obálka routy typu `/.../:id`, kde vnořené komponenty
 * (detail, editace, akce) používají kontext z `AsyncActionProvider`.
 *
 * @component
 * @param {object} props
 * @param {import("react").ReactNode} props.children
 *   Obsah stránky, který se má vyrenderovat uvnitř `AsyncActionProvider`.
 * @param {Function} [props.queryAsyncAction=ReadAsyncAction]
 *   Async action (např. thunk) použitá pro načtení entity z GraphQL endpointu.
 *   Dostane `item` s `id` (a případně další parametry podle implementace provideru).
 *
 * @returns {import("react").JSX.Element}
 *   Provider s navigací (`PageNavbar`) a obsahem stránky (`children`).
 */
export const PageItemBase = ({ children, queryAsyncAction=ReadAsyncAction }) => {
    const {id} = useParams()
    const item = {id}
    return (
        <AsyncActionProvider item={item} queryAsyncAction={queryAsyncAction}>
            <PlaceChild Component={PageNavbar} />
            {children}
        </AsyncActionProvider>
    )
}


export const PageBase = ({ children }) => {
    return (
        <>
            <PageNavbar />
            {children}
        </>
    )
}