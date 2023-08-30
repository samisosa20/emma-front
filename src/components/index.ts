import { lazy } from "react";

const Button = lazy(() => import("./Button"));
const Typography = lazy(() => import("./Typography"));
const Modal = lazy(() => import("./Modal"));

const useComponents = () => {
    return {
        Button,
        Typography,
        Modal,
    }
}

export default useComponents;