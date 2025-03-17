import db from "~/db.server";
import type { SettingForm } from "~/types/setting";

export const getShopSetting = async (shop: string) => {
  try {
    return await db.setting.findFirst({
      where: { shop },
    });
  } catch (error) {
    console.error("Error fetching store settings:", error);
    throw new Error("Failed to fetch store settings");
  }
};

export const upsertSetting = async ({
  shop,
  lang,
  notification_lang,
}: SettingForm) => {
  try {
    return await db.setting.upsert({
      where: { shop },
      create: { shop, lang, notification_lang },
      update: { lang, notification_lang },
    });
  } catch (error) {
    console.error("Error upserting store setting:", error);
    throw new Error("Failed to upsert store setting");
  }
};
