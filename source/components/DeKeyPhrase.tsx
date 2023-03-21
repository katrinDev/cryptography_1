import React, { useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";

export const DeKeyPhrase = () => {
	const [inputString, setInputString] = useState<string>("");
	const [isTextSubmited, setTextSubmited] = useState<boolean>(false);
	const [decryptedString, setDecryptedString] = useState<string>("");
	const [keyString, setKeyString] = useState<string>("");
	const handleEncrypt = (): void => {
		const sortedArray = keyString.split("").sort();
		const keyArray = keyString.split("");

		const numberArray = [];
		let rowLength = keyString.length;
		let num;

		//Creating an array of numbers representing the order of characters
		for (const char of keyArray) {
			num = sortedArray.indexOf(char) + 1;

			numberArray.push(num);
			delete sortedArray[num - 1];
		}

		//Count the amount of arrays we need to store the encrypting line in
		const arraysAmount = Math.ceil(inputString.length / rowLength);

		//Creating matrix to store the encrypting line
		const matrix: string[][] = [];

		for (let i = 0; i < arraysAmount; i++) {
			matrix[i] = [];
			//if it is the last row of the matrix
			if (i === arraysAmount - 1) {
				//the length of the row is the rest of the inputString
				rowLength = inputString.length - rowLength * i;
			}

			for (let j = 0; j < rowLength; j++) {
				matrix[i]?.push(" ");
			}
		}

		//Put the decrypting string into the matrix

		let i = 0;
		let rowIndex = 0;
		let orderNumberIndex;
		rowLength = keyString.length;

		for (const char of inputString.split("")) {
			const lastRowLength = matrix[rowIndex]?.length || -1;

			if (rowIndex === arraysAmount - 1) {
				do {
					orderNumberIndex = numberArray.indexOf(i + 1);

					if (orderNumberIndex >= lastRowLength) {
						i++;
					}
				} while (orderNumberIndex >= lastRowLength);
			} else {
				orderNumberIndex = numberArray.indexOf(i + 1);
			}

			if (typeof matrix[rowIndex] !== "undefined") {
				const a = matrix[rowIndex] as string[];
				a[orderNumberIndex] = char;
			}

			i++;
			if (i === rowLength) {
				i = 0;
				rowIndex++;

				if (rowIndex === arraysAmount) {
					break;
				}
			}
		}

		const resultArray = [];

		for (let rowIndex = 0; rowIndex < arraysAmount; rowIndex++) {
			for (let i = 0; i < rowLength; i++) {
				if (typeof matrix[rowIndex] !== undefined) {
					const a = matrix[rowIndex] as string[];

					resultArray.push(a[i]);
				}
			}
		}

		setDecryptedString(resultArray.join(""));
	};

	if (decryptedString) {
		return (
			<Box>
				<Box marginRight={1}>
					<Text>Decrypted String: {decryptedString}</Text>
				</Box>
			</Box>
		);
	}

	if (isTextSubmited) {
		return (
			<Box>
				<Box marginRight={1}>
					<Text>Enter key:</Text>
				</Box>
				<TextInput
					value={keyString}
					onChange={(str: string) =>
						/^[A-Za-z]*$/.test(str) ? setKeyString(str) : null
					}
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
					onChange={(str: string) =>
						/^[A-Z a-z]*$/.test(str) ? setInputString(str) : null
					}
					onSubmit={() => setTextSubmited(true)}
				/>
			</>
		</Box>
	);
};
