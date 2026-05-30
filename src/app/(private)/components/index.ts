import { lazy, useMemo } from "react";

const Cards = lazy(() => import("./Cards"));
const ListItems = lazy(() => import("./ListItems"));
const Filters = lazy(() => import("./Filters"));
const ModalVerify = lazy(() => import("./ModalVerify"));
const BottomBar = lazy(() => import("./BottomBar"));
const ListMovements = lazy(() => import("./ListMovements"));
const CurrencyBadgeFlag = lazy(() => import("./CurrencyBadgeFlag"));
const ListMovementsDetail = lazy(() => import("./ListMovementsDetail"));
const MetricCard = lazy(() => import("./MetricCard"));

/**
 * ⚡ Bolt Optimization: Stabilize component references in useComponents layout hook.
 * 🎯 Problem: Every call to useComponents returned a new object literal,
 *    causing re-renders in components that destructure it, even if memoized.
 * 📊 Impact: Ensures stable component references, allowing React.memo to
 *    effectively skip re-renders in the private view layer.
 */
const useComponents = () => {
  return useMemo(
    () => ({
      Cards,
      ListItems,
      Filters,
      ModalVerify,
      BottomBar,
      ListMovements,
      CurrencyBadgeFlag,
      ListMovementsDetail,
      MetricCard,
    }),
    [],
  );
};

export default useComponents;
