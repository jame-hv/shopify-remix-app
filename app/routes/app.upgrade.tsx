import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlockStack, Card, Layout, Page } from "@shopify/polaris";
import SelectPlan from "~/components/upgrade/SelectPlan";
import { ANNUAL_PLAN, authenticate, MONTHLY_PLAN } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { billing } = await authenticate.admin(request);

  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: [MONTHLY_PLAN, ANNUAL_PLAN],
    isTest: true,
  });

  // const subscription = billingCheck.appSubscriptions[0];

  return {
    hasActivePayment,
    appSubscriptions,
  };
};

const Upgrade = () => {
  const { hasActivePayment, appSubscriptions } = useLoaderData<typeof loader>();

  const plan = hasActivePayment
    ? appSubscriptions[0]
    : {
        name: "Free",
      };

  return (
    <Page
      fullWidth
      backAction={{ onAction: () => history.back() }}
      title="Upgrade your plan"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <SelectPlan plan={plan} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Upgrade;
