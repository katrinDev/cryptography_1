import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";
import { bigArr } from "../alfa";

export const Caezar: FC<{
	//encryption or decryption
	encryption: boolean;
}> = ({ encryption }) => {
	const [inputString, setInputString] = useState<string>("");

	const [isTextSubmited, setTextSubmited] = useState<boolean>(false);
	const [encryptedString, setEncryptedString] = useState<string>("");
	const [key, setKey] = useState<number>(0);

	const handleEncrypt = (): void => {
		const encryptFunction = (inputString: string, key: number) => {
			const inputArr = inputString.split("");

			let newSymbol;
			let newIndex;
			const resultArr = [];

			for (const symbol of inputArr) {
				for (const symbolsArray of bigArr) {
					if (symbolsArray.includes(symbol)) {
						const arrayLength = symbolsArray.length;

						if (encryption) {
							newIndex = (symbolsArray.indexOf(symbol) + key) % arrayLength;
						} else {
							newIndex =
								(symbolsArray.indexOf(symbol) + arrayLength - key) %
								arrayLength;
						}
						newSymbol = symbolsArray[newIndex];
					}
				}
				resultArr.push(newSymbol);
			}

			return resultArr.join("");
		};

		setEncryptedString(encryptFunction(inputString, key));
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

	if (isTextSubmited) {
		return (
			<Box>
				<Box marginRight={1}>
					<Text>Enter key:</Text>
				</Box>
				<TextInput
					value={key.toString()}
					onChange={(str: string) =>
						/^[0-32]+$/.test(str) ? setKey(+str) : null
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
					onChange={(str: string) => setInputString(str)}
					onSubmit={() => setTextSubmited(true)}
				/>
			</>
		</Box>
	);
};
