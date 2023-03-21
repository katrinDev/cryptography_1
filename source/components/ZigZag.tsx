import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";
//import { App } from "./App";

export const ZigZag: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	const [inputString, setInputString] = useState<string>("");
	const [isTextSubmited, setTextSubmited] = useState<boolean>(false);
	const [keyString, setKeyString] = useState<string>("");

	const handleEncrypt = (): void => {
		const k = Number(keyString);
		if (k == 1) {
			setEncryptedItem(inputString);
		}

		// Start the process on row 1, heading down
		let currentRow = 1;
		let headingDown = true;

		// Initialise an array to store the zigzag data
		const zigZagArray: any = [];

		// Loop through the requested number of rows
		for (let i = 0; i < k; i++) {
			// Initialise each zigzag row as an empty array
			zigZagArray[i] = [];
		}

		// Loop through the string
		for (let i = 0; i < inputString.length; i++) {
			// Add the current letter to the current row
			zigZagArray[currentRow - 1].push(inputString[i]);

			if (headingDown) {
				currentRow++;

				// Check if we've exceeded the maximum number of rows
				if (currentRow > k) {
					// Start heading back up again
					currentRow = k - 1;
					headingDown = false;
				}
			} else {
				currentRow--;

				// Check if we've exceeded the top row
				if (currentRow < 1) {
					// Start heading down again
					currentRow = 2;
					headingDown = true;
				}
			}
		}

		// Initialise a return string
		let totalString = "";

		// Loop through the constructed rows
		for (let i = 0; i < k; i++) {
			// Append the row's characters joined together
			totalString += zigZagArray[i].join("");
		}
		setEncryptedItem(totalString);
		setSelectedItem("");
	};

	if (isTextSubmited) {
		return (
			<Box>
				<Box marginRight={1}>
					<Text>Enter key:</Text>
				</Box>
				<TextInput
					value={keyString}
					onChange={(e: string) => (isNaN(Number(e)) ? null : setKeyString(e))}
					onSubmit={handleEncrypt}
				/>
			</Box>
		);
	}

	return (
		<Box>
			<>
				<Box marginRight={1}>
					<Text>Enter text to encrypt:</Text>
				</Box>

				<TextInput
					value={inputString}
					onChange={(e: string) => setInputString(e)}
					onSubmit={() => setTextSubmited(true)}
				/>
			</>
		</Box>
	);
};
