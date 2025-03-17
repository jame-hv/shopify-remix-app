## Overview

This is a personal template for building Shopify apps using the Remix framework. It can be customized according to your development project needs.

### Requirements

- **Node.js**: Download and install it if you haven't already.
- **Shopify Partner Account**: Required for Shopify app development.
- **Test Store**: Set up a development store or a Shopify Plus sandbox store.

### Local Setup

```bash
git clone https://github.com/jame-hv/shopify-remix-app.git
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

## Snippets

| Snippet             | Description                                    |
| ------------------- | ---------------------------------------------- |
| `createPage`        | Create a new page with simple form             |
| `createComponent`   | Create a new component with simple form        |
| `createSimpleTable` | Create a new page with simple table            |
| `loader`            | Generate a basic Shopify Remix loader function |
| `action`            | Generate a basic Shopify Remix action function |

## Implemented Features

**Note**: To use the billing feature, set the app to Public distribution.

- Basic store settings
- App subscription (monthly and yearly)
- Localization support (i18next)

## Reference Resources

- [Remix Docs](https://remix.run/docs/en/v1)
- [Shopify App Remix](https://shopify.dev/docs/api/shopify-app-remix)
- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [App extensions](https://shopify.dev/docs/apps/app-extensions/list)
- [Shopify Functions](https://shopify.dev/docs/api/functions)
- [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
