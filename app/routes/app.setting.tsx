import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Layout, Page } from "@shopify/polaris";
import { authenticate } from "app/shopify.server";
import { getShopSetting, upsertSetting } from "~/server/account/account.server";

import AccountSetting from "~/components/pages/setting/AccountSetting";
import type { SettingForm } from "~/types/setting";
import { useState } from "react";
import { useToast } from "~/hooks/useToast";
import { useTranslation } from "react-i18next";

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;
  let setting = await getShopSetting(shop);

  if (!setting) {
    setting = await upsertSetting({
      shop,
      lang: "en",
      notification_lang: "en",
    });
  }

  return {
    shop,
    setting,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const settingData: SettingForm = {
    shop: data.shop as string,
    lang: (data.lang as string) || "en", // Ensure fallback
    notification_lang: (data.notification_lang as string) || "en",
    datetime_format: data.datetime_format
      ? Number(data.datetime_format)
      : undefined,
  };

  if (!settingData.shop) {
    return json({ error: "Invalid input" }, { status: 400 });
  }

  await upsertSetting(settingData);

  return json({ success: true });
}

export default function Setting() {
  const { shop, setting } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const { t } = useTranslation("setting");

  const [formData, setFormData] = useState({
    shop: shop,
    lang: setting.lang,
    notification_lang: setting.notification_lang,
  });

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleSave = async () => {
    fetcher.submit(formData, { method: "POST" });
  };

  useToast(fetcher, t("toast.success"));

  return (
    <Page backAction={{ onAction: () => history.back() }} title={t("title")}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <AccountSetting
                isLoading={isLoading}
                formData={formData}
                setFormData={setFormData}
                handleSave={handleSave}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
