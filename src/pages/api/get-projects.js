const data = [
	{
		logo: "https://list.yieldbay.io/icons/umbrella.svg",
		appname: "YieldBay",
		appdescription: "YieldBay is a yield farming aggregator on Polkadot.",
		url: "https://list.yieldbay.io/",
		tags: ["DeFi", "Yield Farming"],
		featured: {
			coverImage:
				"https://pbs.twimg.com/profile_banners/1453999142171205638/1635827564/1500x500",
		},
	},
	{
		logo: "https://pbs.twimg.com/profile_images/1630415235122348032/6Wb4pHd__400x400.jpg",
		appname: "Talisman",
		appdescription: "A user-friendly wallet for Polkadot and Ethereum.",
		url: "https://www.talisman.xyz/",
		tags: ["Wallet"],
		featured: {
			coverImage:
				"https://pbs.twimg.com/profile_banners/1412977944629182472/1657756446/1500x500",
		},
	},
	{
		logo: "https://pbs.twimg.com/profile_images/1519243602072907778/cnEpElQE_400x400.jpg",
		appname: "Subscan",
		appdescription: "High-precision Web3 Blockchain Explorer.",
		url: "https://www.subscan.io/",
		tags: ["Explorer"],
	},
	{
		logo: "https://pbs.twimg.com/profile_images/1651520550295212037/YUKs0gC5_400x400.jpg",
		appname: "SubWallet",
		appdescription: "Comprehensive Polkadot, Substrate & Ethereum wallet.",
		url: "https://www.subwallet.app/",
		tags: ["Wallet"],
	},
	{
		logo: "https://pbs.twimg.com/profile_images/1598685297956585474/RTf32Evr_400x400.jpg",
		appname: "Nova Wallet",
		appdescription: "Next-gen iOS/Android app for Polkadot & Kusamanetwork eco",
		url: "https://novawallet.io/",
		tags: ["Wallet"],
	},
];

export default async function handler(req, res) {
	try {
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ statusCode: 500, message: error.message });
	}
}
