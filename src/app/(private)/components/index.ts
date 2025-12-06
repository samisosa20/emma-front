import { lazy } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));
const Filters = lazy(() => import("./Filters"));
const ModalVerify = lazy(() => import("./ModalVerify"));
const BottomBar = lazy(() => import("./BottomBar"));
const ListMovements = lazy(() => import("./ListMovements"));
const CurrencyBadgeFlag = lazy(() => import("./CurrencyBadgeFlag"));

const useComponents = () => {
  return {
    Cards,
    ListItems,
    Filters,
    ModalVerify,
    BottomBar,
    ListMovements,
    CurrencyBadgeFlag,
  };
};

export default useComponents;
