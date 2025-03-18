import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate, MONTHLY_PLAN } from "~/shopify.server";

// upgrade
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session, billing } = await authenticate.admin(request);
  const { shop } = session;
  const myShop = shop.replace(".myshopify.com", "");

  await billing.require({
    plans: [MONTHLY_PLAN],

    onFailure: async () =>
      billing.request({
        plan: MONTHLY_PLAN,
        isTest: true,
        returnUrl: `https://admin.shopify.com/store/${myShop}/apps/${process.env.APP_NAME}/app/upgrade`,
      }),
  });

  return redirect("/app/upgrade");
};
