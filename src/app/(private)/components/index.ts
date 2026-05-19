import { lazy } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));
const Filters = lazy(() => import("./Filters"));
const ModalVerify = lazy(() => import("./ModalVerify"));
const BottomBar = lazy(() => import("./BottomBar"));
const ListMovements = lazy(() => import("./ListMovements"));
const CurrencyBadgeFlag = lazy(() => import("./CurrencyBadgeFlag"));
const ListMovementsDetail = lazy(() => import("./ListMovementsDetail"));
const MetricCard = lazy(() => import("./MetricCard"));

const useComponents = () => {
  return {
    Cards,
    ListItems,
    Filters,
    ModalVerify,
    BottomBar,
    ListMovements,
    CurrencyBadgeFlag,
    ListMovementsDetail,
    MetricCard,
  };
};

export default useComponents;
