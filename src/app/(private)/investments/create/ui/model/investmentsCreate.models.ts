import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  investmentSchema,
  investmentAppretiationSchema,
} from "@/share/validation";

import {
  useGetApiInvestmentsIdSuspense,
  usePostApiInvestments,
  usePutApiInvestmentsId,
  useDeleteApiInvestmentsId,
  usePutApiInvestmentsIdAppreciationAppreciationId,
  useDeleteApiInvestmentsIdAppreciationAppreciationId,
  usePostApiInvestmentsIdAppreciation,
} from "@@@/endpoints/investment/investment";
import { useUserStore } from "@/share/storage";

export default function useInvestmentsCreateViewModel() {
  const param = useParams();
  const router = useRouter();

  const { badges } = useUserStore();

  const [title, setTitle] = useState("Creacion de Inversiones");
  const [listMovements, setListMovements] = useState<any>([]);
  const [listAppretiations, setListAppretiations] = useState<any>([]);
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [metrics, setMetrics] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idAppretiation, setIdAppretiation] = useState<string>();

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      name: "",
      initAmount: "",
      endAmount: "0",
      badgeId: {},
      dateInvestment: "",
    },
  });

  const {
    handleSubmit: handleSubmitAppre,
    control: controlAppre,
    reset: resetAppre,
  } = useForm({
    resolver: zodResolver(investmentAppretiationSchema),
    defaultValues: {
      amount: "",
      dateAppreciation: new Date().toISOString().split("T")[0],
    },
  });

  const mutation = usePostApiInvestments();

  const mutationEdit = usePutApiInvestmentsId();

  const mutationDelete = useDeleteApiInvestmentsId();

  const { data, refetch } = useGetApiInvestmentsIdSuspense(String(param.id));

  const mutationAppre = usePostApiInvestmentsIdAppreciation();

  const mutationEditAppre =
    usePutApiInvestmentsIdAppreciationAppreciationId();

  const mutationDeleteAppre =
    useDeleteApiInvestmentsIdAppreciationAppreciationId();

  const onSubmit = (data: any) => {
    const formData = {
      ...data,
      badgeId: data.badgeId.value,
      dateInvestment: new Date(data.dateInvestment).toISOString(),
    };
    if (param.id) {
      mutationEdit.mutate(
        {
          id: String(param.id),
          data: formData,
        },
        {
          onSuccess: () => {
            refetch();
            toast.success("Inversion Actualizada");
          },
          onError: () => {
            toast.error("Error al actualizar la inversion");
          },
        }
      );
    } else {
      mutation.mutate(
        {
          data: formData,
        },
        {
          onSuccess: () => {
            toast.success("Inversion Creada");
            router.back();
          },
          onError: () => {
            toast.error("Error al crear la inversion");
          },
        }
      );
    }
  };

  const onSubmitAppre = (data: any) => {
    if (idAppretiation !== undefined) {
      mutationEditAppre.mutate(
        {
          id: String(param.id),
          appreciationId: String(idAppretiation),
          data: {
            ...data,
            dateAppreciation: new Date(data.dateAppreciation),
          },
        },
        {
          onSuccess: () => {
            refetch();
            toast.success("Apreciacion Actualizada");
            handleAppretiation();
          },
          onError: () => {
            toast.error("Error al actualizar la apreciacion");
          },
        }
      );
    } else {
      mutationAppre.mutate(
        {
          id: String(param.id),
          data: {
            ...data,
            dateAppreciation: new Date(data.dateAppreciation),
          },
        },
        {
          onSuccess: () => {
            refetch();
            toast.success("Apreciacion Creada");
            handleAppretiation();
          },
          onError: () => {
            toast.error("Error al crear la apreciacion");
          },
        }
      );
    }
  };

  const handleDelete = () => {
    mutationDelete.mutate(
      {
        id: String(param.id),
      },
      {
        onSuccess: () => {
          router.back();
          toast.success("Inversion Eliminada");
        },
        onError: () => {
          toast.error("Error al eliminar la inversion");
        },
      }
    );
  };

  const handleDeleteAppre = () => {
    mutationDeleteAppre.mutate(
      {
        id: String(param.id),
        appreciationId: String(idAppretiation),
      },
      {
        onSuccess: () => {
          refetch();
          toast.success("Apreciacion Eliminada");
          handleAppretiation();
        },
        onError: () => {
          toast.error("Error al eliminar la apreciacion");
        },
      }
    );
  };

  const handleAppretiation = () => {
    setIsOpen(!isOpen);
    resetAppre({
      amount: "",
      dateAppreciation: new Date().toISOString().split("T")[0],
    });
    setIdAppretiation(undefined);
  };

  const handleEditAppretiation = (id: string) => {
    setIsOpen(!isOpen);
    setIdAppretiation(id);

    const getInfo = listAppretiations.filter((v: any) => v.id === id)[0];
    resetAppre({
      amount: getInfo.amount,
      dateAppreciation: getInfo.dateAppreciation.split("T")[0],
    });
  };

  useEffect(() => {
    refetch();
    setCurrencyOptions(
      badges?.map((v) => {
        return {
          label: String(v.code),
          value: String(v.id),
        };
      })
    );
    if (param.id) {
      setTitle("Edicion de Inversiones");
    }
  }, []);

  useEffect(() => {
    if (!!data && Object.keys(data).length > 0) {
      reset({
        name: data.name,
        initAmount: data.initAmount.toString(),
        endAmount: data.endAmount.toString(),
        badgeId: {
          label: data.badge?.code,
          value: data.badge.id,
        },
        dateInvestment: data.dateInvestment.split("T")[0],
      });
      setListMovements(data.movements);
      setListAppretiations(data.appreciations);
      setMetrics([
        {
          title: "Saldo actual",
          amount: data.endAmount,
          flag: data.badge?.flag,
          symbol: data.badge?.symbol,
          code: data.badge?.code,
        },
        {
          title: "Rendimientos Acu.",
          amount: data.totalReturns,
          flag: data.badge?.flag,
          symbol: data.badge?.symbol,
          code: data.badge?.code,
        },
        {
          title: "Valorizacion",
          amount: data.endAmount - data.totalWithdrawal,
          flag: data.badge?.flag,
          symbol: data.badge?.symbol,
          code: data.badge?.code,
        },
        {
          title: "Valorizacion + Rendimientos",
          text: data.totalRate,
        },
      ]);
    }
  }, [data]);

  return {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions,
    handleDelete,
    handleAppretiation,
    isOpen,
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
    handleEditAppretiation,
    idAppretiation,
    handleDeleteAppre,
    metrics,
    data,
  };
}
