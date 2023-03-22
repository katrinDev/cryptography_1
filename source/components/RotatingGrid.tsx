import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";

export const RotatingGrid: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
	encryption: boolean;
}> = ({ setSelectedItem, encryption, setEncryptedItem }) => {
	const [inputString, setInputString] = useState<string>("");

	const CIPER_ROW_LENGTH = 4;
	const CIPHER_COL_LENGTH = 4;
	const rotateArrayOfStringCounterclockwise = (matrix: string[]): string[] => {
		const numRows = matrix.length;
		const numCols = matrix[0].length;
		const newMatrix: string[] = [];

		for (let col = numCols - 1; col >= 0; col--) {
			const newRow: string[] = [];
			for (let row = 0; row < numRows; row++) {
				newRow.push(matrix[row][col]);
			}
			newMatrix.push(newRow.join(""));
		}

		return newMatrix;
	};

	function rotateMatrixCounterClockwise(matrix: string[][]): string[][] {
		const numRows = matrix.length;
		const numCols = matrix[0].length;
		const newMatrix: string[][] = [];

		for (let col = numCols - 1; col >= 0; col--) {
			const newRow: string[] = [];
			for (let row = 0; row < numRows; row++) {
				newRow.push(matrix[row][col]);
			}
			newMatrix.push(newRow);
		}

		return newMatrix;
	}

	const validateCipherConditions = (arr: string[]): boolean => {
		const globalValidations = [
			(arr: string[]) => arr,
			(arr: string[]) => arr instanceof Array,
			(arr: string[]) => arr.length === CIPER_ROW_LENGTH,
			(arr: string[]) => {
				for (const elem of arr) {
					if (elem.length !== CIPHER_COL_LENGTH) return false;
				}
				return true;
			},
		];
		for (const validator of globalValidations) {
			if (!validator(arr)) return false;
		}
		return true;
	};
	function cutStringIntoArray(str: string) {
		const arr: string[] = [];
		let currentStr = "";
		for (let i = 0; i < str.length; i++) {
			currentStr += str[i];
			if ((i + 1) % 4 === 0 || i === str.length - 1) {
				arr.push(currentStr);
				currentStr = "";
			}
		}
		return arr;
	}

	const getAllIndex = (iterable: string, val: string): number => {
		let indexes: number[] = [];
		for (let i = 0; i < iterable.length; i++)
			if (iterable[i] === val) indexes.push(i);
		return indexes[0] as number;
	};

	const decode = (str: string, patternM: string[]): void => {
		let pwM = cutStringIntoArray(str);

		for (const arr of [patternM, pwM]) {
			if (!validateCipherConditions(arr)) {
				setEncryptedItem("");
				setSelectedItem("");
			}
		}
		for (const string of pwM) {
			if (string.toLowerCase() !== string) {
				setEncryptedItem("");
				setSelectedItem("");
			}
		}
		for (const string of patternM) {
			for (const ch of string) {
				if (ch !== "X" && ch !== ".") {
					setEncryptedItem("");
					setSelectedItem("");
				}
			}
		}
		let decodedStr = "";
		for (let i = 0; i < CIPER_ROW_LENGTH; i++) {
			for (let j = 0; j < CIPHER_COL_LENGTH; j++) {
				let index = getAllIndex(patternM[j], "X");

				decodedStr += pwM[j][index];
			}
			pwM = rotateArrayOfStringCounterclockwise(pwM);
		}

		setEncryptedItem(decodedStr);
		setSelectedItem("");
	};

	const encode = (str: string, patternM: string[]): void => {
		const pwM = cutStringIntoArray(str);

		for (const arr of [patternM, pwM]) {
			if (!validateCipherConditions(arr)) {
				setEncryptedItem("");
				setSelectedItem("");
			}
		}
		for (const string of pwM) {
			if (string.toLowerCase() !== string) {
				setEncryptedItem("");
				setSelectedItem("");
			}
		}
		for (const string of patternM) {
			for (const ch of string) {
				if (ch !== "X" && ch !== ".") {
					setEncryptedItem("");
					setSelectedItem("");
				}
			}
		}
		let newMatrix = [
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
			["", "", "", ""],
		];
		for (let i = 0; i < CIPER_ROW_LENGTH; i++) {
			for (let j = 0; j < CIPHER_COL_LENGTH; j++) {
				let index = getAllIndex(patternM[j] as string, "X");

				newMatrix[j][index] = pwM[i][j];
			}
			newMatrix = rotateMatrixCounterClockwise(newMatrix);
		}

		const result = newMatrix.map((item) => item.join("")).join("");
		setEncryptedItem(result);
		setSelectedItem("");
	};

	return (
		<Box>
			<>
				<Box marginRight={1}>
					<Text>Enter text to encrypt:</Text>
				</Box>

				<TextInput
					value={inputString}
					onChange={(e: string) => setInputString(e)}
					onSubmit={(e) => {
						const pattern = ["X...", "...X", "..X.", ".X.."];
						encryption ? encode(e, pattern) : decode(e, pattern);
					}}
				/>
			</>
		</Box>
	);
};
