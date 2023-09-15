import { lazy } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));
const Filters = lazy(() => import("./Filters"));

const useComponents = () => {
    return {
        Cards,
        ListItems,
        Filters,
    }
}

export default useComponents;