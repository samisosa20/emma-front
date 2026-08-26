"use client";

import { Suspense } from "react";
import useSharedSpacesViewModel from "./ui/model/sharedSpaces.models";
import SharedSpaces from "./ui/view/SharedSpaces";

function SharedSpacesContent() {
  const viewModel = useSharedSpacesViewModel();
  return <SharedSpaces {...viewModel} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-wf-on-surface-variant text-xs">Cargando espacios compartidos...</div>}>
      <SharedSpacesContent />
    </Suspense>
  );
}
