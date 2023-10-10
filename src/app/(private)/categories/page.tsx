
"use client";
//components
import useComponents from "@/share/components";
import Categories from './ui/view/Categories';

import useCategoriesViewModel from './ui/model/categories.models';

const Page = () => {
  const { data, isLoading, setSearch, handleToggle, search, isChecked  } = useCategoriesViewModel();

  const { Typography } = useComponents();

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return <Categories data={data} search={search} setSearch={setSearch} isChecked={isChecked} handleToggle={handleToggle} />;
};

export default Page;
