"use client";
import HeritageYear from './ui/view/HeritageYear'

//components
import useComponents from "@/share/components";

import useHeritageYear from "./ui/model/heritageYear.models";

const Page = () => {
    const { Typography } = useComponents();
    const { isLoading, data } = useHeritageYear();

    if (isLoading || data === undefined) {
        return <Typography>Cargando...</Typography>;
      }

    return <HeritageYear data={data}/>
}

export default Page