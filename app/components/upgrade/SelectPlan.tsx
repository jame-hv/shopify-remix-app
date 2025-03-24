import {
  Box,
  Card,
  CalloutCard,
  Text,
  Grid,
  Divider,
  BlockStack,
  ExceptionList,
  Button,
} from "@shopify/polaris";
import { useTranslation } from "react-i18next";

const planData = [
  {
    key: "monthlyPlan",
    name: "Monthly subscription",
  },
  {
    key: "annualPlan",
    name: "Annual subscription",
  },
];

interface PricingProps {
  plan: any;
}

export default function SelectPlan(props: PricingProps) {
  const { plan } = props;
  const { t } = useTranslation("upgrade");
  const isAnnual = plan.name === t("annualPlan.name");

  return (
    <>
      {plan.name === "Free" ? (
        <Card>
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">
              {t("freePlanMessage")}
            </Text>
          </BlockStack>
        </Card>
      ) : (
        <CalloutCard
          title={t("changePlanTitle")}
          illustration="https://cdn.shopify.com/s/files/1/0583/6465/7734/files/tag.png?v=1705280535"
          primaryAction={{
            content: t("cancelPlan"),
            url: "/api/subscription/cancel",
          }}
        >
          {t("currentPlan")}: {plan.name}
        </CalloutCard>
      )}

      <div style={{ margin: "1rem 0" }}>
        <Divider />
      </div>

      <Grid>
        {planData.map((plan_item, index) => (
          <Grid.Cell
            key={index}
            columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
          >
            <Card
              background={
                plan_item.name === plan.name
                  ? "bg-surface-success"
                  : "bg-surface"
              }
            >
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">
                  {t(`${plan_item.key}.title`)}
                </Text>
                <Box>
                  {t(`${plan_item.key}.description`)}
                  <br />
                  <BlockStack>
                    <Text as="p" variant="heading2xl" fontWeight="bold">
                      {plan_item.key === "freePlan"
                        ? "Free"
                        : `$${t(`${plan_item.key}.price`)}`}
                    </Text>
                    <Text as="span" variant="bodyMd">
                      / {t(`${plan_item.key}.period`)}
                    </Text>
                  </BlockStack>
                </Box>

                <div style={{ margin: "1rem 0" }}>
                  <Divider />
                </div>

                <BlockStack gap="100">
                  <ExceptionList
                    items={[{ description: t(`${plan_item.key}.feature1`) }]}
                  />
                  <ExceptionList
                    items={[{ description: t(`${plan_item.key}.feature2`) }]}
                  />
                  <ExceptionList
                    items={[{ description: t(`${plan_item.key}.feature3`) }]}
                  />
                  <ExceptionList
                    items={[{ description: t(`${plan_item.key}.feature4`) }]}
                  />
                </BlockStack>

                <div style={{ margin: "0.5rem 0" }}></div>

                {plan_item.name !== plan.name ? (
                  <Button
                    variant="primary"
                    url={t(`${plan_item.key}.url`)}
                    disabled={isAnnual && plan_item.key === "monthlyPlan"}
                  >
                    {t(`${plan_item.key}.action`)}
                  </Button>
                ) : (
                  <Text as="p" variant="bodyMd" fontWeight="bold">
                    {t("currentPlanMessage")}
                  </Text>
                )}
              </BlockStack>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </>
  );
}
