import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";
import { alphabetArr } from "../alfa";

export const SubstMultiplic: FC<{
	//encryption or decryption
	encryption: boolean;
}> = ({ encryption }) => {
	const [inputString, setInputString] = useState<string>("");

	const [encryptedString, setEncryptedString] = useState<string>("");

	const inputArr = inputString.split("");

	const handleEncrypt = (): void => {
		function NOD(x: number, y: number) {
			while (x && y) {
				x > y ? (x = x %= y) : (y = y %= x);
			}
			return x + y;
		}

		function keysGenerator(maxNumber: number) {
			let a = 1;
			let b = 3;
			do {
				if (NOD(a, b) === 1 && (a * b) % maxNumber === 1) {
					return [a, b];
				}
				b++;
				if (b === maxNumber) {
					a++;
					b = 2;
				}
			} while (a <= maxNumber);

			return null;
		}

		const encryptFunction = (
			inputArr: string[],
			key: number,
			alphabet: string[]
		) => {
			let newSymbol;
			let newIndex;
			const resultArr = [];

			for (const symbol of inputArr) {
				const arrayLength = alphabet.length;

				newIndex = (alphabet.indexOf(symbol) * key) % arrayLength;
				newSymbol = alphabet[newIndex];
				resultArr.push(newSymbol);
			}

			return resultArr.join("");
		};

		let ourAlphabet: string[] = [""];

		for (const alphabet of alphabetArr) {
			if (alphabet.includes(inputArr[0] as string)) {
				ourAlphabet = alphabet;
			}
		}

		const [encryptKey, decryptKey] = keysGenerator(ourAlphabet.length);

		const ourKey = encryption ? encryptKey : decryptKey;

		setEncryptedString(encryptFunction(inputArr, ourKey, ourAlphabet));
	};

	if (encryptedString) {
		return (
			<Box>
				<Box marginRight={1}>
					<Text>Encrypted String: {encryptedString}</Text>
				</Box>
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
					onChange={(str: string) => setInputString(str)}
					onSubmit={handleEncrypt}
				/>
			</>
		</Box>
	);
};
