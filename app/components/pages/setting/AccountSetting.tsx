import { BlockStack, Button, ButtonGroup, Select } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import {
  dateTimeSelectionOptions,
  languageSelectionOptions,
} from "~/constants/options";
import type { SettingForm } from "~/types/setting";

interface AccountSettingProps {
  isLoading: boolean;
  formData: SettingForm;
  setFormData: React.Dispatch<React.SetStateAction<SettingForm>>;
  handleSave: () => void;
}

const AccountSetting: React.FC<AccountSettingProps> = ({
  isLoading,
  formData,
  setFormData,
  handleSave,
}) => {
  const { t } = useTranslation("setting");
  const handleChange = (key: keyof SettingForm, value: string | number) => {
    setFormData((formData) => ({ ...formData, [key]: value }));
  };

  return (
    <BlockStack gap="400">
      <Select
        label={t("labels.admin_lang")}
        options={languageSelectionOptions}
        value={formData.lang}
        onChange={(value) => handleChange("lang", value)}
      />

      <Select
        label={t("labels.notification_lang")}
        options={languageSelectionOptions}
        value={formData.notification_lang}
        onChange={(value) => handleChange("notification_lang", value)}
      />

      <Select
        label={t("labels.datetime_format")}
        options={dateTimeSelectionOptions}
        value={formData.datetime_format?.toString()}
        onChange={(value) => handleChange("datetime_format", value)}
      />

      <ButtonGroup>
        <Button loading={isLoading} onClick={handleSave} variant="primary">
          {t("button.save")}
        </Button>
      </ButtonGroup>
    </BlockStack>
  );
};

export default AccountSetting;
