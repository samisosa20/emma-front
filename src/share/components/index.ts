import { lazy } from "react";

const Button = lazy(() => import("./Button"));
const Typography = lazy(() => import("./Typography"));
const Modal = lazy(() => import("./Modal"));
const Input = lazy(() => import("./Input"));
const FormControl = lazy(() => import("./FormControl"));
const Toast = lazy(() => import("./Toast"));

const useComponents = () => {
    return {
        Button,
        Typography,
        Modal,
        Input,
        FormControl,
        Toast,
    }
}

export default useComponents;