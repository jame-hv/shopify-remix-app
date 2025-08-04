import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { SettingForm } from "~/types/setting";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Layout, Page, Text } from "@shopify/polaris";
import { authenticate } from "app/shopify.server";
import {
  getShopSetting,
  upsertSetting,
} from "~/.server/account/account.server";
import { useState } from "react";
import { useToast } from "~/hooks/useToast";
import { useTranslation } from "react-i18next";
import { TitleBar } from "@shopify/app-bridge-react";
import AccountSetting from "~/components/pages/setting/AccountSetting";

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
    lang: (data.lang as string) || "en",
    notification_lang: (data.notification_lang as string) || "en",
    datetime_format: data.datetime_format
      ? Number(data.datetime_format)
      : undefined,
  };

  if (!settingData.shop) {
    return {
      errors: {
        shop: "Please enter your shop domain to log in",
      },
      status: 400,
    };
  }

  await upsertSetting(settingData);

  return {
    status: 200,
    success: true,
  };
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
    <Page>
      <TitleBar title={t("title")} />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                {t("title")}
              </Text>
              <BlockStack gap="400">
                <AccountSetting
                  isLoading={isLoading}
                  formData={formData}
                  setFormData={setFormData}
                  handleSave={handleSave}
                />
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
