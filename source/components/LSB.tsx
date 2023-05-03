import React, { FC, useState } from "react";
import { Box, Text } from "ink";
import { readFile, writeFile } from "fs/promises";
import TextInput from "ink-text-input";

export const LSB: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	const [keyString, setKeyString] = useState<string>("");

	async function handleEncrypt() {
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
		setSelectedItem("");
		setEncryptedItem("");
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
