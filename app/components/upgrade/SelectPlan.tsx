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

const planData = [
  {
    title: "Monthly Plan",
    description: "Access premium features with a monthly subscription.",
    price: "9",
    period: "month",
    name: "Monthly subscription",
    action: "Upgrade",
    url: "/api/subscription/monthly",
    features: [
      "Manage up to 10,000 products",
      "Advanced customization options",
      "Priority customer support",
      "Detailed analytics and reporting",
    ],
  },
  {
    title: "Annual Plan",
    description:
      "Save more with an annual subscription while enjoying premium features.",
    price: "99",
    period: "year",
    name: "Annual subscription",
    action: "Upgrade",
    url: "/api/subscription/annual",
    features: [
      "Manage up to 100,000 products",
      "Advanced customization options",
      "Priority customer support",
      "Detailed analytics and reporting",
    ],
  },
];

interface PricingProps {
  plan: any;
}

export default function SelectPlan(props: PricingProps) {
  const { plan } = props;
  const isAnnual = plan.name === "Annual subscription"; // ✅ Check if the user is on an annual plan

  return (
    <>
      {plan.name === "Free" ? (
        <Card>
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">
              You are currently on the {plan.name} plan
            </Text>
          </BlockStack>
        </Card>
      ) : (
        <CalloutCard
          title="Change Your Plan"
          illustration="https://cdn.shopify.com/s/files/1/0583/6465/7734/files/tag.png?v=1705280535"
          primaryAction={{
            content: "Cancel Plan",
            url: "/api/subscription/cancel",
          }}
        >
          You are currently on the {plan.name} plan
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
                  {plan_item.title}
                </Text>
                <Box>
                  {plan_item.description}
                  <br />
                  <BlockStack>
                    <Text as="p" variant="heading3xl" fontWeight="bold">
                      {plan_item.price === "0" ? "Free" : `$${plan_item.price}`}
                    </Text>
                    <Text as="span" variant="bodyMd" alignment="end">
                      / {plan_item.period}
                    </Text>
                  </BlockStack>
                </Box>

                <div style={{ margin: "1rem 0" }}>
                  <Divider />
                </div>

                <BlockStack gap="100">
                  {plan_item.features.map((feature, featureIndex) => (
                    <ExceptionList
                      key={featureIndex}
                      items={[{ description: feature }]}
                    />
                  ))}
                </BlockStack>

                <div style={{ margin: "1rem 0" }}>
                  <Divider />
                </div>

                {plan_item.name !== plan.name ? (
                  <Button
                    variant="primary"
                    url={plan_item.url}
                    disabled={
                      isAnnual && plan_item.name === "Monthly subscription"
                    }
                  >
                    {plan_item.action}
                  </Button>
                ) : (
                  <Text as="p" variant="bodyMd" fontWeight="bold">
                    You're currently on this plan
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
