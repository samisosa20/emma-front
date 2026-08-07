"use client";
import React, { Suspense } from "react";

// Components
import useComponents from "@/share/components";
import IncomeDistribution from "./ui/view/IncomeDistribution";
import useIncomeDistributionViewModel from "./ui/model/income-distribution.models";

function IncomeDistributionContainer() {
  const props = useIncomeDistributionViewModel();
  return <IncomeDistribution {...props} />;
}

export default function Page() {
  const { Loading } = useComponents();

  return (
    <Suspense fallback={<Loading />}>
      <IncomeDistributionContainer />
    </Suspense>
  );
}
