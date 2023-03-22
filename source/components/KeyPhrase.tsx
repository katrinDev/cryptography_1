import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";

export const KeyPhrase: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	const [inputString, setInputString] = useState<string>("");
	const [isTextSubmited, setTextSubmited] = useState<boolean>(false);
	const [keyString, setKeyString] = useState<string>("");

	const handleEncrypt = (): void => {
		const sortedArray = keyString.split("").sort();
		const keyArray = keyString.split("");

		const numberArray = [];
		const rowLength = keyString.length;
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
		}

		//Put the encrypting string into the matrix
		let row = 0;
		for (const char of inputString.split("")) {
			matrix[row]?.push(char);

			const matrixRowLength = matrix[row]?.length;

			if (matrixRowLength === undefined) {
				console.log("Error in the algorythm!");
			} else if (matrixRowLength >= rowLength) {
				row++;
			}
		}

		// console.log(matrix);

		const resultArray = [];

		for (const row of matrix) {
			for (let i = 0; i < rowLength; i++) {
				const orderNumberIndex = numberArray.indexOf(i + 1);
				if (row[orderNumberIndex]) {
					resultArray.push(row[orderNumberIndex]);
				}
			}
		}

		setEncryptedItem(resultArray.join(""));
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
					onChange={(str: string) =>
						/^[A-Za-z]*$/.test(str) ? setKeyString(str) : ""
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
						/^[A-Z a-z]*$/.test(str) ? setInputString(str) : ""
					}
					onSubmit={() => setTextSubmited(true)}
				/>
			</>
		</Box>
	);
};
