import { lazy } from "react";

const Button = lazy(() => import("./Button"));
const Typography = lazy(() => import("./Typography"));

const useComponents = () => {
    return {
        Button,
        Typography,
    }
}

export default useComponents;