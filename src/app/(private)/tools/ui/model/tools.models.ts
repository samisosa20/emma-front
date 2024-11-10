import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ToolUseCase } from "@@/application/tool.use-case";
import { ToolApiAdapter } from "@@/infrastructure/tool-api.adapter";

import {
  predictionParamsSchema,
  testProjectParamsSchema,
} from "@/share/validation";
import type {
  PredictionParamsSchema,
  TestProjectParamsSchema,
} from "@/share/validation";
import { customConfigHeader } from "@/share/helpers";

export default function useToolsViewModel() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [displayText, setDisplayText] = useState({ id: 0, message: "" });
  const [resultCanIDo, setResultCanIDo] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultTextTest, setResultTextTest] = useState("");
  const [resultTest, setResultTest] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(predictionParamsSchema),
  });

  const { handleSubmit: handleSubmitTest, control: controlTest } = useForm({
    resolver: zodResolver(testProjectParamsSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: PredictionParamsSchema) => {
      const user = localStorage.getItem("fiona-user");
      if (user) {
        const { getCanIDo } = new ToolUseCase(
          new ToolApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await getCanIDo(data);
        setResultCanIDo(result);
        setIsOpen(true);
      }
    },
  });

  const mutationTest = useMutation({
    mutationFn: async (data: TestProjectParamsSchema) => {
      const user = localStorage.getItem("fiona-user");
      if (user) {
        const { getTestProject } = new ToolUseCase(
          new ToolApiAdapter({
            baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
            customConfig: customConfigHeader(),
          })
        );
        const result = await getTestProject(data);
        setResultTest(result);
        setResultTextTest(result.message.fun + ". " + result.message.real);
        setIsOpen(true);
      }
    },
  });

  const onSubmit = (data: any) => {
    setResultCanIDo("");
    setResultTextTest("");
    setCurrentIndex(0);
    mutation.mutate({
      amount: data.amount,
      badge_id: data.badge_id,
    });
  };

  const onSubmitTest = (data: any) => {
    setResultTextTest("");
    setResultCanIDo("");
    setCurrentIndex(0);
    setDisplayText({ id: 0, message: "" });
    mutationTest.mutate(data);
  };

  const handleClose = () => {
    setResultTextTest("");
    setResultCanIDo("");
    setCurrentIndex(0);
    setIsOpen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("fiona-user");
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < resultCanIDo.length) {
        setDisplayText({
          id: 1,
          message: resultCanIDo.substring(0, currentIndex + 1),
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 85);
    return () => clearInterval(interval);
  }, [resultCanIDo, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < resultTextTest.length) {
        setDisplayText({
          id: 2,
          message: resultTextTest.substring(0, currentIndex + 1),
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 85);
    return () => clearInterval(interval);
  }, [resultTextTest, currentIndex]);

  return {
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    displayText,
    handleSubmitTest,
    controlTest,
    onSubmitTest,
    resultTest,
    isOpen,
    handleClose,
  };
}
