"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";

// Interface
import { ListItems as ListItemsProps } from "./ListItems.interface";
import {
  driverListGroupExpensive,
  formatoMoneda,
  getIconComponent,
} from "@/share/helpers";

const ListDefault = (props: ListItemsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();
  return (
    <div className="bg-white p-4 shadow-sm rounded">
      <Typography className="mb-4">{title}</Typography>
      <div className="h-[243px] overflow-y-auto">
        {data?.map((card, index) => (
          <div
            className={`mb-2 pt-2 ${index > 0 ? "border-t" : ""}`}
            key={"ListDefault" + index}
          >
            <Typography variant="h5">{card.category}</Typography>
            <Typography
              variant="h3"
              className={`text-right ${
                card.amount >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {formatoMoneda.format(card.amount)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListUtil = (props: ListItemsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();
  return (
    <div className="bg-white p-4 shadow-sm rounded">
      <Typography className="mb-4">{title}</Typography>
      <div className="h-[243px] overflow-y-auto">
        {data?.map((card, index) => (
          <div
            className={`mb-2 pt-2 ${index > 0 ? "border-t" : ""}`}
            key={"ListUtil" + index}
          >
            <Typography variant="h5">
              {card.title} {card.father ? ` (${card.father})` : ""}
            </Typography>
            <div className="flex justify-between items- center">
              <Typography variant="p" className={`text-right`}>
                {formatoMoneda.format(card.value)}
                {` (${Math.abs(card.percentage ?? 0)}%)`}
              </Typography>
              <Typography variant="p" className={`text-right`}>
                {formatoMoneda.format(card.limit ?? 0)}
              </Typography>
            </div>
            <div className="w-full bg-gray-200 rounded">
              <div
                className={`h-3 bg-${card.color}-400 rounded`}
                style={{
                  width: `${
                    Math.abs(card.percentage ?? 0) > 100
                      ? 100
                      : Math.abs(card.percentage ?? 0)
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListModal = (props: ListItemsProps) => {
  const {
    data,
    title,
    onClickModal,
    dataModal,
    showHistory,
    currency,
    tooltip,
    tooltipVariant,
  } = props;
  const { Typography, Modal, TitleHelp } = useComponents();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const handleSelectItem = async (id: number) => {
    onClickModal && (await onClickModal(id));
    setIsOpen(true);
    setCategoryId(id);
  };

  const handleOnDrive = (type?: string) => {
    if (type === "group") {
      driverListGroupExpensive();
    }
  };

  return (
    <div className="bg-white p-4 shadow-sm rounded">
      <TitleHelp
        title={title}
        variant="p"
        onClick={tooltip ? () => handleOnDrive(tooltipVariant) : undefined}
      />
      <div className="h-[243px] overflow-y-auto">
        {data?.map((card, index) => {
          const Icon = getIconComponent(card.icon ?? "PiAcorn");
          return (
            <div
              className={`mb-2 pt-2 ${
                index > 0 ? "border-t" : ""
              } cursor-pointer`}
              key={"ListModal" + index}
              onClick={() => handleSelectItem(card.amount)} // TODO: change
            >
              <div className={`flex items-center justify-between`}>
                <div className={`flex items-center gap-x-2 w-1/2`}>
                  <div
                    className={`rounded-full shadow-sm w-8 h-8 hover:opacity-80 flex justify-center items-center`}
                    style={{
                      background: card.color,
                    }}
                  >
                    <Icon size={16} className="text-gray-200" />
                  </div>
                  <Typography variant="h5" className="text-xs">
                    {card.category}
                  </Typography>
                </div>
                <div
                  className={`flex items-center gap-x-2 w-2/5 justify-between`}
                >
                  <Typography variant="h3" className={`text-right text-sm`}>
                    {`${card.participation}%`}
                  </Typography>
                  <Typography
                    variant="h3"
                    className={`text-right text-sm ${
                      card.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatoMoneda.format(card.amount)}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        title="Listado de movimientos"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {dataModal &&
          dataModal.map((data, index) => (
            <div className={`${index > 0 ? "border-t" : ""} py-3`} key={index}>
              <div className="flex items-center justify-between">
                <Typography>{formatoMoneda.format(data.amount)}</Typography>
                <Typography>
                  {data.account?.name ??
                    `${data.category?.name} ${
                      data.category?.category_father
                        ? ` (${data.category?.category_father?.name})`
                        : ""
                    }`}
                </Typography>
              </div>
              <div className="flex items-center justify-between">
                <Typography>{data.date_purchase}</Typography>
                {data.event && <Typography>{data.event?.name}</Typography>}
              </div>
              {data.description && <Typography>{data.description}</Typography>}
            </div>
          ))}
        {showHistory && (
          <div className="text-center mt-6">
            <Typography
              variant="p"
              className="text-black underline cursor-pointer hover:text-gray-400"
              onClick={() =>
                router.push(`categories/${categoryId}?c=${currency?.id}`)
              }
            >
              Ver historico
            </Typography>
          </div>
        )}
      </Modal>
    </div>
  );
};

const ListItems = (props: ListItemsProps) => {
  const {
    data,
    title,
    variant = "default",
    onClickModal,
    dataModal = [],
    showHistory = false,
    currency,
    tooltip = false,
    tooltipVariant,
  } = props;

  if (variant === "default") {
    return <ListDefault data={data} title={title} />;
  } else if (variant === "utilization") {
    return <ListUtil data={data} title={title} />;
  } else if (variant === "modal") {
    return (
      <ListModal
        data={data}
        title={title}
        onClickModal={onClickModal}
        dataModal={dataModal}
        showHistory={showHistory}
        currency={currency}
        tooltip={tooltip}
        tooltipVariant={tooltipVariant}
      />
    );
  }
};

export default ListItems;
