"use client";
//components
import Verify from "./ui/view/Verify";

import useVerify from "./ui/model/verify.models";

export default function Page() {
  useVerify();

  return (
    <Verify/>
  );
}
