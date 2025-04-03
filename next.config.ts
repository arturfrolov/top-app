import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';


const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'old-images.hb.ru-msk.vkcs.cloud',
				pathname: '/uploads/**',
			}
		]
	},

  /* config options here */
	webpack(config) {

		const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) =>
			rule.test instanceof RegExp && rule.test.test('.svg'),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							prettier: false,
							svgo: true,
							svgoConfig: {
								plugins: [{
									name: 'preset-default',
									params: {
										override: {
											removeViewBox: false
										}
									},
								}],
							},
							titleProp: true,
						},
					},
				],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},


};

export default nextConfig;
