import Cards from "./Cards";
import ListItems from "./ListItems";
import Filters from "./Filters";
import ModalVerify from "./ModalVerify";
import BottomBar from "./BottomBar";
import ListMovements from "./ListMovements";
import CurrencyBadgeFlag from "./CurrencyBadgeFlag";
import ListMovementsDetail from "./ListMovementsDetail";
import MetricCard from "./MetricCard";

const PRIVATE_COMPONENTS = {
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

const useComponents = () => PRIVATE_COMPONENTS;

export default useComponents;
