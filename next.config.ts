import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	env: {
		npm_package_version: process.env.npm_package_version
	},
	redirects: async ()=> [
		{
			source: "/tools",
			destination: "/",
			permanent: true
		},
		{
			source: "/tools/server",
			destination: "/",
			permanent: true
		},
		{
			source: "/tools/string",
			destination: "/",
			permanent: true
		},
		{
			source: "/tools/3d-printing",
			destination: "/",
			permanent: true
		}
	]
};

export default nextConfig;
