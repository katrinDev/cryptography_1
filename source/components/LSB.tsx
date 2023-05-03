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
		// Читаем данные из файла input.mp3
		const data = await readFile("input.mp3");

		// Преобразуем сообщение в двоичное представление
		const binaryMessage = keyString
			.split("")
			.map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
			.join("");

		// Встраиваем сообщение с помощью метода LSB
		let dataIndex = 0;
		for (let i = 0; i < binaryMessage.length; i += 3) {
			// Извлекаем три бита из двоичного сообщения
			const bitsToEmbed = binaryMessage.slice(i, i + 3);

			// Встраиваем три бита в текущий байт данных
			data[dataIndex] = (data[dataIndex] & ~7) | parseInt(bitsToEmbed, 2);

			// Переходим к следующему байту данных
			dataIndex++;
		}

		// Сохраняем измененные данные в файл output.mp3
		await writeFile("output.mp3", data);

		// Вызываем функцию дешифровки для проверки результата
		await handleDecrypt(keyString.length);

		// Очищаем значения выбранных элементов
		setSelectedItem("");
		setEncryptedItem("");
	}

	async function handleDecrypt(messageLength: number): Promise<void> {
		// Читаем данные из файла output.mp3
		const data = await readFile("output.mp3");

		// Извлекаем сообщение с помощью метода LSB
		let binaryMessage = "";
		for (let i = 0; i < messageLength * 8; i += 3) {
			// Извлекаем три бита из текущего байта данных
			binaryMessage += (data[Math.floor(i / 3)] & 7)
				.toString(2)
				.padStart(3, "0");
		}

		// Преобразуем двоичное представление в строку
		const message = binaryMessage
			.match(/.{1,8}/g)
			?.map((binary) => String.fromCharCode(parseInt(binary, 2)))
			.join("");

		// Выводим расшифрованное сообщение в консоль
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
