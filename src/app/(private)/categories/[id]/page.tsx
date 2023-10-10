"use client";
import CategoryDetail from './ui/view/CategoryDetail'

//components
import useComponents from "@/share/components";

import useCategoryDetailViewModel from "./ui/model/categoryDetail.models";

const Page = () => {
    const { Typography } = useComponents();
    const { isLoading, data, setSearch, handleToggle, search, isChecked } = useCategoryDetailViewModel();

    if (isLoading || data === undefined) {
        return <Typography>Cargando...</Typography>;
      }

    return <CategoryDetail data={data} search={search} setSearch={setSearch} isChecked={isChecked} handleToggle={handleToggle} />
}

export default Page