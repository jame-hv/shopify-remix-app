import type { useFetcher } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export const useToast = <T extends { success?: boolean; error?: string }>(
  fetcher: ReturnType<typeof useFetcher<T>>,
  successMessage: string = "Saved successfully!",
) => {
  const shopify = useAppBridge();
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if ("success" in fetcher.data && fetcher.data.success) {
        shopify.toast.show(successMessage);
      } else if ("error" in fetcher.data) {
        shopify.toast.show(fetcher.data.error || "Something went wrong.");
      }
    }
  }, [fetcher.state, fetcher.data, shopify, successMessage]);
};
