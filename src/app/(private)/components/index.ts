import { lazy } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));

const useComponents = () => {
    return {
        Cards,
        ListItems,
    }
}

export default useComponents;