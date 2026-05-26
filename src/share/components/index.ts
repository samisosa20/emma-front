import { lazy, useMemo } from "react";

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
const Checkbox = lazy(() => import("./Checkbox"));
const Loading = lazy(() => import("./Loader"));
const TitleHelp = lazy(() => import("./TitleHelp"));
const Textarea = lazy(() => import("./Textarea"));
const SlideStepper = lazy(() => import("./SlideStepper"));
const SegmentedControl = lazy(() => import("./SegmentedControl"));
const CategoryIcon = lazy(() => import("./CategoryIcon"));

/**
 * ⚡ Bolt Optimization: Stabilize component references in useComponents hook.
 * 🎯 Problem: Every call to useComponents returned a new object literal,
 *    causing re-renders in components that destructure it, even if memoized.
 * 📊 Impact: Ensures stable component references, allowing React.memo to
 *    effectively skip re-renders in the view layer.
 */
const useComponents = () => {
  return useMemo(
    () => ({
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
      Checkbox,
      Loading,
      TitleHelp,
      Textarea,
      SlideStepper,
      SegmentedControl,
      CategoryIcon,
    }),
    [],
  );
};

export default useComponents;
