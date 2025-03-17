import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { ANNUAL_PLAN, authenticate, MONTHLY_PLAN } from "~/shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { billing } = await authenticate.admin(request);

    const billingCheck = await billing.require({
      plans: [MONTHLY_PLAN, ANNUAL_PLAN],
      isTest: true,
      onFailure: async () => {
        return json(
          { error: "No active subscription found." },
          { status: 400 },
        );
      },
    });
    const subscription = billingCheck.appSubscriptions?.[0];

    // Cancel the subscription
    await billing.cancel({
      subscriptionId: subscription.id,
      isTest: true,
      prorate: true,
    });

    return redirect("/app");
  } catch (error) {
    console.error("Subscription cancellation error:", error);
    return {
      error: "An error occurred while cancelling the subscription.",
      status: 500,
    };
  }
};
