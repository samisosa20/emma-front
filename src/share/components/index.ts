import { lazy } from "react";

const Button = lazy(() => import("./Button"));
const Typography = lazy(() => import("./Typography"));
const Modal = lazy(() => import("./Modal"));
const Input = lazy(() => import("./Input"));
const FormControl = lazy(() => import("./FormControl"));
const Toast = lazy(() => import("./Toast"));
const Switch = lazy(() => import("./Switch"));
const Select = lazy(() => import("./Select"));
const RadioGroup = lazy(() => import("./RadioGroup"));
const AutoComplete = lazy(() => import("./AutoComplete"));
const Checbox = lazy(() => import("./Checkbox"));

const useComponents = () => {
    return {
        Button,
        Typography,
        Modal,
        Input,
        FormControl,
        Toast,
        Switch,
        Select,
        RadioGroup,
        AutoComplete,
        Checbox,
    }
}

export default useComponents;