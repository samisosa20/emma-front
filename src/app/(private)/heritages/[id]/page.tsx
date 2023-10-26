"use client";
import HeritageYear from './ui/view/HeritageYear'

//components
import useComponents from "@/share/components";

import useHeritageYear from "./ui/model/heritageYear.models";

const Page = () => {
    const { Loading } = useComponents();
    const { isLoading, data } = useHeritageYear();

    if (isLoading || data === undefined) {
        return <Loading/>;
      }

    return <HeritageYear data={data}/>
}

export default Page