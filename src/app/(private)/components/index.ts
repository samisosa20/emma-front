import { lazy } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));
const Filters = lazy(() => import("./Filters"));
const ModalVerify = lazy(() => import("./ModalVerify"));

const useComponents = () => {
    return {
        Cards,
        ListItems,
        Filters,
        ModalVerify,
    }
}

export default useComponents;