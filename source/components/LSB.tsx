import React, { FC, useState } from "react";
import { Box, Text } from "ink";
import { readFile, writeFile } from "fs/promises";
import TextInput from "ink-text-input";

export const LSB: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	const [keyString, setKeyString] = useState<string>("");

	async function handleEncrypt(keyString: string) {
		const data = await readFile("input.mp3");

		// Convert message to binary
		const binaryMessage = keyString
			.split("")
			.map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
			.join("");

		// Embed message using LSB method
		let dataIndex = 0;
		for (let i = 0; i < binaryMessage.length; i += 3) {
			const bitsToEmbed = binaryMessage.slice(i, i + 3);
			data[dataIndex] = (data[dataIndex] & ~7) | parseInt(bitsToEmbed, 2);
			dataIndex++;
		}

		// Save output file
		await writeFile("output.mp3", data);
		await handleDecrypt(keyString.length);
		setSelectedItem("");
		setEncryptedItem("");
	}

	async function handleDecrypt(messageLength: number): Promise<void> {
		const data = await readFile("output.mp3");

		// Extract message using LSB method
		let binaryMessage = "";
		for (let i = 0; i < messageLength * 8; i += 3) {
			binaryMessage += (data[Math.floor(i / 3)] & 7)
				.toString(2)
				.padStart(3, "0");
		}

		// Convert binary to string
		const message = binaryMessage
			.match(/.{1,8}/g)
			?.map((binary) => String.fromCharCode(parseInt(binary, 2)))
			.join("");

		console.log("decrypted: ", message);
	}

	return (
		<Box>
			<Box marginRight={1}>
				<Text>Enter message: </Text>
			</Box>
			<TextInput
				value={keyString}
				onChange={(e: string) => setKeyString(e)}
				onSubmit={handleEncrypt}
			/>
		</Box>
	);
};
