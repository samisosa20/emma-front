"use client";

import useMovementsImportViewModel from "./ui/model/movementsImport.models";
import MovementsImport from "./ui/view/MovementsImport";

export default function Page() {
  const viewModel = useMovementsImportViewModel();

  return <MovementsImport {...viewModel} />;
}
