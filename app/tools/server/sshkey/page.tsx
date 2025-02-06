'use client'

import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Code} from "@/components/code";
import {Combobox, ComboboxItem} from "@/components/combobox";
import {setEnvironmentData} from "node:worker_threads";

const winEditors: ComboboxItem[] = [
	{
		value: "notepad",
		label: "Notepad",
	},
	{
		value: "code",
		label: "VS Code",
	}
]
const linuxEditors: ComboboxItem[] = [
	{
		value: "nano",
		label: "Nano",
	},
]

const systems: ComboboxItem[] = [
	{
		value: "windows",
		label: "Windows",
	},
	{
		value: "linux",
		label: "Linux",
	},
]

export default function SshKey() {
	const [editorWin, setEditorWin] = useState<ComboboxItem>(winEditors[0])
	const [editorLinux, setEditorLinux] = useState<ComboboxItem>(linuxEditors[0])
	const [system, setSystem] = useState<ComboboxItem>(systems[0])
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
					<div className="flex justify-center flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label htmlFor="email">Local System</Label>
							<Combobox items={systems} onChangeAction={(e) => setSystem(e)}/>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email">Text Editor</Label>
							{system.value == "windows" ?
								(<Combobox items={winEditors} onChangeAction={(e) => setEditorWin(e)} key={1}/>) :
								(<Combobox items={linuxEditors} onChangeAction={(e) => setEditorLinux(e)} key={2}/>)
							}
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center min-h-[100vh] flex-1 rounded-xl bg-panel md:min-h-min">
				<div className="flex w-full h-full flex-col">
					<article className="p-4">
						<div className="p-1">
							<h4>1. {`${system.value == "windows" ? "Open Powershell" : "Open Terminal"}`}</h4>
						</div>
						<div className="p-1">
							<h4>2. Generate new ssh key with command:</h4>
							<Code lang="powershell">
								{`ssh-keygen -t rsa -b 4096 -f ${system.value == "windows" ? ("$HOME\\.ssh\\id_rsa-") : ("~/.ssh/id_rsa-")}${hostname.toLowerCase()}`}
							</Code>
						</div>
						<div className="p-1">
							<h4>3. Copy ssh key to server:</h4>
							<Code lang="powershell">
								{`${system.value == "windows" ? ("type $env:USERPROFILE\\.ssh\\id_rsa-" + hostname.toLowerCase() + ".pub | ssh " + username + "@" + address + " \"if [ ! -d ~/.ssh ]; then mkdir -p ~/.ssh; fi && cat >> ~/.ssh/authorized_keys\"") : ("ssh-copy-id -i ~/.ssh/id_rsa-" + hostname.toLowerCase() + ".pub " + username + "@" + address)}`}
							</Code>
						</div>
						<div className="p-1">
							<h4>4. Open ssh config:</h4>
							<Code lang="powershell">
								{`${system.value == "windows" ? ("ac $HOME\\.ssh\\config $null | " + editorWin.value + " $HOME\\.ssh\\config") : (editorLinux.value + " ~/.ssh/config")}`}
							</Code>
						</div>
						<div className="p-1">
							<h4>5. Add this to your ssh config:</h4>
							<Code lang="powershell">
								{`
Host ${hostname} 
  HostName ${address} 
  User ${username}
  Port 22
  IdentityFile ~/.ssh/id_rsa-${hostname.toLowerCase()}
								`}
							</Code>
						</div>
						<div className="p-1">
							<h4>6. Done! now you can connect to your server like this:</h4>
							<Code lang="powershell">
								{`ssh ${hostname}`}
							</Code>
						</div>
					</article>
				</div>
			</div>
		</>
	);
}
//          ssh-keygen -t rsa -b 4096 -f &#34;$HOME\.ssh\id_rsa-{hostname}&#34;
