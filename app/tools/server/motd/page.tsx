'use client'

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Code} from "@/components/code";


export default function SshKey() {
	const [address, setAddress] = useState<string>("example.com")
	const [username, setUsername] = useState<string>("root")
	const [hostname, setHostname] = useState<string>("Debian12")


	return (
		<>
			<div className="flex justify-center flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">SSH Key Setup</h1>
					<hr/>
					<div className="flex justify-center flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label htmlFor="email">Username</Label>
							<Input onChange={(e) => setUsername(e.target.value.trim())} value={username}/>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email">Address</Label>
							<Input onChange={(e) => setAddress(e.target.value.trim())} value={address}/>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email">Hostname</Label>
							<Input onChange={(e) => setHostname(e.target.value.trim())} value={hostname}/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center min-h-[100vh] flex-1 rounded-xl bg-panel md:min-h-min">
				<div className="flex w-full h-full flex-col">
					<article className="p-4">
						<div className="p-1">
							<h4>1. Connect to server where you want to install the custom motd</h4>
						</div>
						<div className="p-1">
							<h4>2. Empty default motd, by running:</h4>
							<Code lang="powershell">
								{`cat /dev/null > /etc/motd`}
							</Code>
						</div>
						<div className="p-1">
							<h4>2. Change your working directory, by running:</h4>
							<Code lang="powershell">
								{`cd /etc/update-motd.d/`}
							</Code>
						</div>
						<div className="p-1">
							<h4>2. Check if folder has any files</h4>
							<Code lang="powershell">
								{`ls ./`}
							</Code>
							<div className="pl-5 pt-1">
								<h4>2.1. If there is files new must delete them, by running:</h4>
								<h3 className="pl-2 text-[14px] text-red-400">- MAKE SURE THAT YOU ARE WORKING IN <span className="text-red-500">/etc/update-motd.d/</span></h3>
								<h3 className="pl-2 text-[14px] text-red-400">- DO NOT FORGOT THE <span className="text-red-500">.</span> BEFORE <span className="text-red-500">/</span> </h3>
								<Code lang="powershell">
									{`rm -rf ./`}
								</Code>
							</div>
						</div>
						<div className="p-1">
							<h4>3. Create & edit new motd file, by running:</h4>
							<Code lang="powershell">
								{`nano motd`}
							</Code>
						</div>
						<div className="p-1">
							<h4>3. Copy this content to the new motd file that you are editing:</h4>
							<Code lang="powershell">
								{`
#!/bin/sh
if [ -z "$DISTRIB_DESCRIPTION" ] && [ -x /usr/bin/lsb_release ]; then
        # Fall back to using the very slow lsb_release utility
        DISTRIB_DESCRIPTION=$(lsb_release -s -d)
fi

#Get processor info
PROCESSOR=$(cat /proc/cpuinfo | grep 'Model' | awk -F': ' 'NR==1 {print $2}')
if ! [ \${#PROCESSOR} -gt 0 ]; then
        PROCESSOR=$(cat /proc/cpuinfo | grep 'model name' | awk -F': ' 'NR==1 {print $2}')
fi

# Get free/total memory
MEM_TOTAL=$(free -h --si | awk 'NR==2 {print $2}')
MEM_USED=$(free -h --si | awk 'NR==2 {print $3}')

# Get total uptime
UPTIME=$(uptime -p | awk '{sub(/up /, ""); print}')

# Get the last login information
LAST_LOGIN=$(last -d -w -n 1 --time-format iso)
LOGIN_USER=$(echo "$LAST_LOGIN" | awk '{print $1}' | head -n 1)
LOGIN_IP=$(echo "$LAST_LOGIN" | awk '{print $3}' | head -n 1)
LOGIN_ISO_TIME=$(echo "$LAST_LOGIN" | awk '{print $4}' | head -n 1)

LOGIN_TIME=$(date -d "$LOGIN_ISO_TIME" "+%d.%m.%Y-%H:%M-%Z")

# Build the final banner art to show
art=$(printf "
\e[31m
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠙⠻⢶⣄⡀⠀⠀⠀⢀⣤⠶⠛⠛
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⣙⣿⣦⣤⣴⣿⣁⠀⠀⣸⠇
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣡⣾⣿⣿⣿⣿⣿⣿⣿⣷⣌⠋
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣷⣄⡈⢻⣿⡟⢁⣠⣾⣿⣦
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⠘⣿⠃⣿⣿⣿⣿⡏    \e[91m  ______     __          __          __          __
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠈⠛⣰⠿⣆⠛⠁ ⡀     \e[91m /_  __/____/ /_  __  __/ /_  ____ _/ /   __  __/ /_  ____ _
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣦⠀⠘⠛⠋⠀⣴⣿⠀     \e[91m  / / / ___/ __ \\/ / / / __ \\/ __ \`/ /   / / / / __ \\/ __ \`/
\e[31m⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣿⣿⡇⠀⠀⠀⢸⣿⣏ ⠀ ⠀⠀⠀\e[91m / / (__  ) / / / /_/ / /_/ / /_/ / /___/ /_/ / /_/ / /_/ /
\e[31m⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠀⠀⠀⠾⢿⣿⠀⠀⠀⠀⠀ \e[91m/_/ /____/_/ /_/\\__,_/_.___/\\__,_/_____/\\__,_/_.___/\\__,_/
\e[31m⠀⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⡿⠟⠋⣁⣠⣤⣤⡶⠶⠶⣤⣄⠈
\e[31m⠀⠀⠀⢰⣿⣿⣮⣉⣉⣉⣤⣴⣶⣿⣿⣋⡥⠄⠀⠀⠀⠀⠉⢻⣄
\e[31m⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣋⣁⣤⣀⣀⣤⣤⣤⣤⣄⣿⡄
\e[31m⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠋⠉⠁⠀⠀⠀⠀⠈⠛⠃
\e[31m⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉
\e[0m
\e[90m┎[System Info]
\e[90m┣━\e[31mOS: \e[91m%s
\e[90m┣━\e[31mProcessor: \e[91m%s
\e[90m┣━\e[31mMemory: \e[91m%s/%s
\e[90m┣━\e[31mUpTime: \e[91m%s
\e[90m┗━\e[31mLast Login: \e[91m%s from %s on %s
\e[0m
" "$DISTRIB_DESCRIPTION" "$PROCESSOR" "$MEM_USED" "$MEM_TOTAL" "$UPTIME" "$LOGIN_USER" "$LOGIN_IP" "$LOGIN_TIME")
echo "$art"
								`}
							</Code>
						</div>
					</article>
				</div>
			</div>
		</>
	);
}
//          ssh-keygen -t rsa -b 4096 -f &#34;$HOME\.ssh\id_rsa-{hostname}&#34;
