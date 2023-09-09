"use client";
import AccountDetail from './ui/view/AccountDetail'

//components
import useComponents from "@/share/components";

import useAccount from "./ui/model/accountDetail.models";

const Page = () => {
    const { Typography } = useComponents();
    const { isLoading, data } = useAccount();

    if (isLoading || data === undefined) {
        return <Typography>Cargando...</Typography>;
      }

    return <AccountDetail data={data}/>
}

export default Page