[Dot AppStore](https://dotappstore.com) is an unofficial, community-led project that keeps track of projects and applications in the Polkadot ecosystem.

## How to submit a project?

1. Create a new issue on this repo using the [listing request](https://github.com/iammasterbrucewayne/dotappstore/issues/new?assignees=iammasterbrucewayne&labels=listing+request&projects=&template=listing-request.md&title=%5BLISTING+REQUEST%5D) issue template.
2. Fill all required details and open an issue with the `listing request` label.

## Guidelines

Anyone is welcome to submit a project for listing.  Projects listed on the app store are broad in scope, with the main criteria for listing being the value addition to the Polkadot ecosystem.

Generally, your project will have better chances to be listed if:

- It is already live and being used by the community.
- Your team has proven experience with the relevant languages and technologies and/or a strong technical background.
- Your code is open-sourced, and does not rely on closed-source software for full functionality. We prefer GPLv3, but Apache 2.0, MIT or Unlicense are also acceptable.

Additionally, it must fulfill the following requirements:

- We do not list NFTs or tokens, but NFT interfaces, protocols, DEXes, etc. are accepted.
- We do not list projects that actively encourage gambling, illicit trade, money laundering or criminal activities in general.

## Development

First, you will need to set up your local environment with the following variables:

```env
# Database
MONGODB_URI = "<your_mongodb_project_data_database_uri>"
MONGODB_USERS_URI = "<your_mongodb_users_database_uri>"

# Auth
TWITTER_CLIENT_ID = "<your_twitter_client_id>"
TWITTER_CLIENT_SECRET = "<your_twitter_client_secret>"
SENDGRID_BEARER = "<your_sendgrid_bearer_token>"
SENDER_EMAIL = "<email_id_for_magic_links>"
JWT_SECRET = "<jwt_secret>"
AUTH_SECRET = "<random_string_of_at_least_32_characters>"

# Cloudinary
NEXT_PUBLIC_CLOUD_NAME = "<your_cloudinary_cloud_name>"
NEXT_PUBLIC_PRESET = "<your_cloudinary_cloud_preset>"
```

Next, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`.
