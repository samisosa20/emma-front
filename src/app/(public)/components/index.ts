import { lazy } from "react";

const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("./Footer"));

const useComponents = () => {
    return {
        Header,
        Footer,
    }
}

export default useComponents;