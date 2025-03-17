## 概要

ShopifyアプリをRemixフレームワークで構築するための個人的なテンプレートです。自身の開発プロジェクトに応じてカスタマイズ可能です。

### 必要なもの

- **Node.js**: インストールされていない場合はダウンロードしてインストールしてください。
- **Shopifyパートナーアカウント**: Shopifyアプリ開発のために必要です。
- **テストストア**: 開発ストアまたはShopify Plusのサンドボックスストアを用意してください。

### ローカル環境設定

```bash
git clone https://github.com/VuHoang2know/shopify-remix-app.git
```

```bash
cd shopify-remix-app
```

```bash
cp env.example .env
```

```bash
npm i && npm run dev
```

## 実装した機能

注意：請求機能を使用するには、アプリをパブリック配信(Public distribution)に設定してください

- 店舗の基本設定
- アプリサブスクリプション（月額または年額）
- 多言語対応（i18next）

## 参考リソース

- [Remix Docs](https://remix.run/docs/en/v1)
- [Shopify App Remix](https://shopify.dev/docs/api/shopify-app-remix)
- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [App extensions](https://shopify.dev/docs/apps/app-extensions/list)
- [Shopify Functions](https://shopify.dev/docs/api/functions)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
