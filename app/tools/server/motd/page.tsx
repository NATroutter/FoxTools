'use client'

import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Code} from "@/components/code";

import * as figlet from 'figlet';
import {ComboBox, ComboboxItem} from "@/components/comboBox";
import {ColorComboBox, ComboBoxColor} from "@/components/colorComboBox";

const fonts: ComboboxItem[] = [
	{value: "1Row",label: "1Row",},
	{value: "3-D",label: "3-D",},
	{value: "3D Diagonal",label: "3D Diagonal",},
	{value: "3D-ASCII",label: "3D-ASCII",},
	{value: "3x5",label: "3x5",},
	{value: "4Max",label: "4Max",},
	{value: "5 Line Oblique",label: "5 Line Oblique",},
	{value: "Acrobatic",label: "Acrobatic",},
	{value: "Alligator",label: "Alligator",},
	{value: "Alligator2",label: "Alligator2",},
	{value: "Alpha",label: "Alpha",},
	{value: "Alphabet",label: "Alphabet",},
	{value: "AMC 3 Line",label: "AMC 3 Line",},
	{value: "AMC 3 Liv1",label: "AMC 3 Liv1",},
	{value: "AMC AAA01",label: "AMC AAA01",},
	{value: "AMC Neko",label: "AMC Neko",},
	{value: "AMC Razor",label: "AMC Razor",},
	{value: "AMC Razor2",label: "AMC Razor2",},
	{value: "AMC Slash",label: "AMC Slash",},
	{value: "AMC Slider",label: "AMC Slider",},
	{value: "AMC Thin",label: "AMC Thin",},
	{value: "AMC Tubes",label: "AMC Tubes",},
	{value: "AMC Untitled",label: "AMC Untitled",},
	{value: "ANSI Regular",label: "ANSI Regular",},
	{value: "ANSI Shadow",label: "ANSI Shadow",},
	{value: "Arrows",label: "Arrows",},
	{value: "ASCII New Roman",label: "ASCII New Roman",},
	{value: "Avatar",label: "Avatar",},
	{value: "B1FF",label: "B1FF",},
	{value: "Banner",label: "Banner",},
	{value: "Banner3-D",label: "Banner3-D",},
	{value: "Banner3",label: "Banner3",},
	{value: "Banner4",label: "Banner4",},
	{value: "Barbwire",label: "Barbwire",},
	{value: "Basic",label: "Basic",},
	{value: "Bear",label: "Bear",},
	{value: "Bell",label: "Bell",},
	{value: "Benjamin",label: "Benjamin",},
	{value: "Big Chief",label: "Big Chief",},
	{value: "Big Money-ne",label: "Big Money-ne",},
	{value: "Big Money-nw",label: "Big Money-nw",},
	{value: "Big Money-se",label: "Big Money-se",},
	{value: "Big Money-sw",label: "Big Money-sw",},
	{value: "Big",label: "Big",},
	{value: "Bigfig",label: "Bigfig",},
	{value: "Binary",label: "Binary",},
	{value: "Block",label: "Block",},
	{value: "Blocks",label: "Blocks",},
	{value: "Bloody",label: "Bloody",},
	{value: "BlurVision ASCII",label: "BlurVision ASCII",},
	{value: "Bolger",label: "Bolger",},
	{value: "Braced",label: "Braced",},
	{value: "Bright",label: "Bright",},
	{value: "Broadway KB",label: "Broadway KB",},
	{value: "Broadway",label: "Broadway",},
	{value: "Bubble",label: "Bubble",},
	{value: "Bulbhead",label: "Bulbhead",},
	{value: "Caligraphy",label: "Caligraphy",},
	{value: "Caligraphy2",label: "Caligraphy2",},
	{value: "Calvin S",label: "Calvin S",},
	{value: "Cards",label: "Cards",},
	{value: "Catwalk",label: "Catwalk",},
	{value: "Chiseled",label: "Chiseled",},
	{value: "Chunky",label: "Chunky",},
	{value: "Coinstak",label: "Coinstak",},
	{value: "Cola",label: "Cola",},
	{value: "Colossal",label: "Colossal",},
	{value: "Computer",label: "Computer",},
	{value: "Contessa",label: "Contessa",},
	{value: "Contrast",label: "Contrast",},
	{value: "Cosmike",label: "Cosmike",},
	{value: "Cosmike2",label: "Cosmike2",},
	{value: "Crawford",label: "Crawford",},
	{value: "Crawford2",label: "Crawford2",},
	{value: "Crazy",label: "Crazy",},
	{value: "Cricket",label: "Cricket",},
	{value: "Cursive",label: "Cursive",},
	{value: "Cyberlarge",label: "Cyberlarge",},
	{value: "Cybermedium",label: "Cybermedium",},
	{value: "Cybersmall",label: "Cybersmall",},
	{value: "Cygnet",label: "Cygnet",},
	{value: "DANC4",label: "DANC4",},
	{value: "Dancing Font",label: "Dancing Font",},
	{value: "Decimal",label: "Decimal",},
	{value: "Def Leppard",label: "Def Leppard",},
	{value: "Delta Corps Priest 1",label: "Delta Corps Priest 1",},
	{value: "DiamFont",label: "DiamFont",},
	{value: "Diamond",label: "Diamond",},
	{value: "Diet Cola",label: "Diet Cola",},
	{value: "Digital",label: "Digital",},
	{value: "Doh",label: "Doh",},
	{value: "Doom",label: "Doom",},
	{value: "DOS Rebel",label: "DOS Rebel",},
	{value: "Dot Matrix",label: "Dot Matrix",},
	{value: "Double Shorts",label: "Double Shorts",},
	{value: "Double",label: "Double",},
	{value: "Dr Pepper",label: "Dr Pepper",},
	{value: "DWhistled",label: "DWhistled",},
	{value: "Efti Chess",label: "Efti Chess",},
	{value: "Efti Font",label: "Efti Font",},
	{value: "Efti Italic",label: "Efti Italic",},
	{value: "Efti Piti",label: "Efti Piti",},
	{value: "Efti Robot",label: "Efti Robot",},
	{value: "Efti Wall",label: "Efti Wall",},
	{value: "Efti Water",label: "Efti Water",},
	{value: "Electronic",label: "Electronic",},
	{value: "Elite",label: "Elite",},
	{value: "Epic",label: "Epic",},
	{value: "Fender",label: "Fender",},
	{value: "Filter",label: "Filter",},
	{value: "Fire Font-k",label: "Fire Font-k",},
	{value: "Fire Font-s",label: "Fire Font-s",},
	{value: "Flipped",label: "Flipped",},
	{value: "Flower Power",label: "Flower Power",},
	{value: "Four Tops",label: "Four Tops",},
	{value: "Fraktur",label: "Fraktur",},
	{value: "Fun Face",label: "Fun Face",},
	{value: "Fun Faces",label: "Fun Faces",},
	{value: "Fuzzy",label: "Fuzzy",},
	{value: "Georgi16",label: "Georgi16",},
	{value: "Georgia11",label: "Georgia11",},
	{value: "Ghost",label: "Ghost",},
	{value: "Ghoulish",label: "Ghoulish",},
	{value: "Glenyn",label: "Glenyn",},
	{value: "Goofy",label: "Goofy",},
	{value: "Gothic",label: "Gothic",},
	{value: "Graceful",label: "Graceful",},
	{value: "Gradient",label: "Gradient",},
	{value: "Graffiti",label: "Graffiti",},
	{value: "Greek",label: "Greek",},
	{value: "Heart Left",label: "Heart Left",},
	{value: "Heart Right",label: "Heart Right",},
	{value: "Henry 3D",label: "Henry 3D",},
	{value: "Hex",label: "Hex",},
	{value: "Hieroglyphs",label: "Hieroglyphs",},
	{value: "Hollywood",label: "Hollywood",},
	{value: "Horizontal Left",label: "Horizontal Left",},
	{value: "Horizontal Right",label: "Horizontal Right",},
	{value: "ICL-1900",label: "ICL-1900",},
	{value: "Impossible",label: "Impossible",},
	{value: "Invita",label: "Invita",},
	{value: "Isometric1",label: "Isometric1",},
	{value: "Isometric2",label: "Isometric2",},
	{value: "Isometric3",label: "Isometric3",},
	{value: "Isometric4",label: "Isometric4",},
	{value: "Italic",label: "Italic",},
	{value: "Ivrit",label: "Ivrit",},
	{value: "Jacky",label: "Jacky",},
	{value: "Jazmine",label: "Jazmine",},
	{value: "Jerusalem",label: "Jerusalem",},
	{value: "JS Block Letters",label: "JS Block Letters",},
	{value: "JS Bracket Letters",label: "JS Bracket Letters",},
	{value: "JS Capital Curves",label: "JS Capital Curves",},
	{value: "JS Cursive",label: "JS Cursive",},
	{value: "JS Stick Letters",label: "JS Stick Letters",},
	{value: "Katakana",label: "Katakana",},
	{value: "Kban",label: "Kban",},
	{value: "Keyboard",label: "Keyboard",},
	{value: "Knob",label: "Knob",},
	{value: "Konto Slant",label: "Konto Slant",},
	{value: "Konto",label: "Konto",},
	{value: "Larry 3D 2",label: "Larry 3D 2",},
	{value: "Larry 3D",label: "Larry 3D",},
	{value: "LCD",label: "LCD",},
	{value: "Lean",label: "Lean",},
	{value: "Letters",label: "Letters",},
	{value: "Lil Devil",label: "Lil Devil",},
	{value: "Line Blocks",label: "Line Blocks",},
	{value: "Linux",label: "Linux",},
	{value: "Lockergnome",label: "Lockergnome",},
	{value: "Madrid",label: "Madrid",},
	{value: "Marquee",label: "Marquee",},
	{value: "Maxfour",label: "Maxfour",},
	{value: "Merlin1",label: "Merlin1",},
	{value: "Merlin2",label: "Merlin2",},
	{value: "Mike",label: "Mike",},
	{value: "Mini",label: "Mini",},
	{value: "miniwi",label: "miniwi",},
	{value: "Mirror",label: "Mirror",},
	{value: "Mnemonic",label: "Mnemonic",},
	{value: "Modular",label: "Modular",},
	{value: "Morse",label: "Morse",},
	{value: "Morse2",label: "Morse2",},
	{value: "Moscow",label: "Moscow",},
	{value: "Mshebrew210",label: "Mshebrew210",},
	{value: "Muzzle",label: "Muzzle",},
	{value: "Nancyj-Fancy",label: "Nancyj-Fancy",},
	{value: "Nancyj-Improved",label: "Nancyj-Improved",},
	{value: "Nancyj-Underlined",label: "Nancyj-Underlined",},
	{value: "Nancyj",label: "Nancyj",},
	{value: "Nipples",label: "Nipples",},
	{value: "NScript",label: "NScript",},
	{value: "NT Greek",label: "NT Greek",},
	{value: "NV Script",label: "NV Script",},
	{value: "O8",label: "O8",},
	{value: "Octal",label: "Octal",},
	{value: "Ogre",label: "Ogre",},
	{value: "Old Banner",label: "Old Banner",},
	{value: "OS2",label: "OS2",},
	{value: "Pagga",label: "Pagga",},
	{value: "Patorjk's Cheese",label: "Patorjk's Cheese",},
	{value: "Patorjk-HeX",label: "Patorjk-HeX",},
	{value: "Pawp",label: "Pawp",},
	{value: "Peaks Slant",label: "Peaks Slant",},
	{value: "Peaks",label: "Peaks",},
	{value: "Pebbles",label: "Pebbles",},
	{value: "Pepper",label: "Pepper",},
	{value: "Poison",label: "Poison",},
	{value: "Puffy",label: "Puffy",},
	{value: "Puzzle",label: "Puzzle",},
	{value: "Pyramid",label: "Pyramid",},
	{value: "Rammstein",label: "Rammstein",},
	{value: "Rectangles",label: "Rectangles",},
	{value: "Red Phoenix",label: "Red Phoenix",},
	{value: "Relief",label: "Relief",},
	{value: "Relief2",label: "Relief2",},
	{value: "Reverse",label: "Reverse",},
	{value: "Roman",label: "Roman",},
	{value: "Rot13",label: "Rot13",},
	{value: "Rotated",label: "Rotated",},
	{value: "Rounded",label: "Rounded",},
	{value: "Rowan Cap",label: "Rowan Cap",},
	{value: "Rozzo",label: "Rozzo",},
	{value: "RubiFont",label: "RubiFont",},
	{value: "Runic",label: "Runic",},
	{value: "Runyc",label: "Runyc",},
	{value: "S Blood",label: "S Blood",},
	{value: "Santa Clara",label: "Santa Clara",},
	{value: "Script",label: "Script",},
	{value: "Serifcap",label: "Serifcap",},
	{value: "Shaded Blocky",label: "Shaded Blocky",},
	{value: "Shadow",label: "Shadow",},
	{value: "Shimrod",label: "Shimrod",},
	{value: "Short",label: "Short",},
	{value: "SL Script",label: "SL Script",},
	{value: "Slant Relief",label: "Slant Relief",},
	{value: "Slant",label: "Slant",},
	{value: "Slide",label: "Slide",},
	{value: "Small Caps",label: "Small Caps",},
	{value: "Small Isometric1",label: "Small Isometric1",},
	{value: "Small Keyboard",label: "Small Keyboard",},
	{value: "Small Poison",label: "Small Poison",},
	{value: "Small Script",label: "Small Script",},
	{value: "Small Shadow",label: "Small Shadow",},
	{value: "Small Slant",label: "Small Slant",},
	{value: "Small Tengwar",label: "Small Tengwar",},
	{value: "Small",label: "Small",},
	{value: "Soft",label: "Soft",},
	{value: "Speed",label: "Speed",},
	{value: "Spliff",label: "Spliff",},
	{value: "Stacey",label: "Stacey",},
	{value: "Stampate",label: "Stampate",},
	{value: "Stampatello",label: "Stampatello",},
	{value: "Standard",label: "Standard",},
	{value: "Star Strips",label: "Star Strips",},
	{value: "Star Wars",label: "Star Wars",},
	{value: "Stellar",label: "Stellar",},
	{value: "Stforek",label: "Stforek",},
	{value: "Stick Letters",label: "Stick Letters",},
	{value: "Stop",label: "Stop",},
	{value: "Straight",label: "Straight",},
	{value: "Stronger Than All",label: "Stronger Than All",},
	{value: "Sub-Zero",label: "Sub-Zero",},
	{value: "Swamp Land",label: "Swamp Land",},
	{value: "Swan",label: "Swan",},
	{value: "Sweet",label: "Sweet",},
	{value: "Tanja",label: "Tanja",},
	{value: "Tengwar",label: "Tengwar",},
	{value: "Term",label: "Term",},
	{value: "Test1",label: "Test1",},
	{value: "The Edge",label: "The Edge",},
	{value: "Thick",label: "Thick",},
	{value: "Thin",label: "Thin",},
	{value: "THIS",label: "THIS",},
	{value: "Thorned",label: "Thorned",},
	{value: "Three Point",label: "Three Point",},
	{value: "Ticks Slant",label: "Ticks Slant",},
	{value: "Ticks",label: "Ticks",},
	{value: "Tiles",label: "Tiles",},
	{value: "Tinker-Toy",label: "Tinker-Toy",},
	{value: "Tombstone",label: "Tombstone",},
	{value: "Train",label: "Train",},
	{value: "Trek",label: "Trek",},
	{value: "Tsalagi",label: "Tsalagi",},
	{value: "Tubular",label: "Tubular",},
	{value: "Twisted",label: "Twisted",},
	{value: "Two Point",label: "Two Point",},
	{value: "Univers",label: "Univers",},
	{value: "USA Flag",label: "USA Flag",},
	{value: "Varsity",label: "Varsity",},
	{value: "Wavy",label: "Wavy",},
	{value: "Weird",label: "Weird",},
	{value: "Wet Letter",label: "Wet Letter",},
	{value: "Whimsy",label: "Whimsy",},
	{value: "Wow",label: "Wow",},

]

const mainColors: ComboBoxColor[] = [
	{
		color: {
			red:255,
			green:0,
			blue:0
		},
		label: "red",
		value: "a"
	},
	{
		color: {
			red:0,
			green:0,
			blue:255
		},
		label: "blue",
		value: "b"
	}
]

export default function MotdSetup() {
	const [title, setTitle] = useState<string>("Title")
	const [font, setFont] = useState<ComboboxItem>(fonts[0])
	const [mainColor, setMainColor] = useState<ComboBoxColor>(mainColors[0])
	const [ascii, setAscii] = useState<string|undefined>("Title")

	figlet.defaults({ fontPath: "/fonts/ascii/" });

	useEffect(() => {
		// figlet.text(title, {
		// 	font: font.value,
		// 	horizontalLayout: "default",
		// 	verticalLayout: "default",
		// 	width: 80,
		// 	whitespaceBreak: true,
		// }, (err,data)=> {
		// 	setAscii(data);
		// })
	}, [setAscii, title,font, mainColor]);

	return (
		<>
			<div className="flex justify-center flex-0 rounded-xl bg-panel md:min-h-min p-2">
				<div className="w-full">
					<h1 className="text-4xl p-4 py-2 text-center">Server MOTD setup</h1>
					<hr/>
					<div className="flex justify-center flex-wrap gap-2 pt-4 p-2">
						<div className="flex flex-col">
							<Label htmlFor="email">Title</Label>
							<Input onChange={(e) => setTitle(e.target.value.trim())} value={title}/>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email">Title Font</Label>
							<ComboBox items={fonts} onChangeAction={(e) => setFont(e)}/>
						</div>
						<div className="flex flex-col">
							<Label htmlFor="email">Main Color</Label>
							<ColorComboBox items={mainColors} onChangeAction={(e) => setMainColor(e)}/>
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


							<pre>
								{ascii}
							</pre>

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
								<Code lang="powershell">
									{`rm <file_name>`}
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
