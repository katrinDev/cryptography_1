import React, { FC, useState } from "react";
import TextInput from "ink-text-input";
import { Box, Text } from "ink";

export const ElGamal: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	const [keyString, setKeyString] = useState<string>("");
	const validateCipherConditions = (str: string): boolean => {
		const globalValidations = [
			(str: string) => str,
			(str: string) => !isNaN(Number(str)),
		];
		for (const validator of globalValidations) {
			if (!validator(str)) return false;
		}
		return true;
	};
	// Функция быстрого возведения в степень по модулю
	function fastModularExponentiation(
		base: number,
		exponent: number,
		modulus: number
	): number {
		if (modulus === 1) return 0;
		let result = 1;
		base = base % modulus;
		while (exponent > 0) {
			// Если показатель нечетный, умножаем результат на основание и берем остаток от деления на модуль
			if (exponent % 2 === 1) result = (result * base) % modulus;
			// Делим показатель на 2
			exponent = exponent >> 1;
			// Возводим основание в квадрат и берем остаток от деления на модуль
			base = (base * base) % modulus;
		}
		return result;
	}

	// Функция нахождения первообразного корня по модулю
	function primitiveRoot(p: number): number {
		// Вычисляем значение функции Эйлера для p
		let phi = p - 1;
		let n = phi;
		let primeFactors: number[] = [];
		// Находим простые множители числа phi
		for (let i = 2; i * i <= n; i++) {
			if (n % i === 0) {
				primeFactors.push(i);
				while (n % i === 0) n /= i;
			}
		}
		if (n > 1) primeFactors.push(n);
		// Перебираем все числа от 2 до phi
		for (let r = 2; r <= phi; r++) {
			let flag = false;
			// Проверяем условие первообразного корня для каждого простого множителя числа phi
			for (let i = 0; i < primeFactors.length; i++) {
				if (fastModularExponentiation(r, phi / primeFactors[i], p) === 1) {
					flag = true;
					break;
				}
			}
			// Если условие выполнено для всех простых множителей числа phi, возвращаем r как первообразный корень по модулю p
			if (!flag) return r;
		}
		return -1;
	}

	// Интерфейс для пары ключей ElGamal
	interface ElGamalKeyPair {
		publicKey: { p: number; g: number; y: number };
		privateKey: { x: number };
	}

	// генерация пары ключей ElGamal
	function generateElGamalKeyPair(p: number): ElGamalKeyPair {
		// первообразный корень по модулю p
		const g = primitiveRoot(p);
		// случайное число x в диапазоне от 1 до p-1
		const x = Math.floor(Math.random() * (p - 1)) + 1;
		// y = g^x mod p
		const y = fastModularExponentiation(g, x, p);
		// Возвращаем пару ключей
		return { publicKey: { p, g, y }, privateKey: { x } };
	}

	interface ElGamalCipherText {
	  a: number;
		b: number;
	}

	function elGamalEncrypt(
		plainText: number,
		publicKey: { p: number; g: number; y: number }
	): ElGamalCipherText {
		const k = Math.floor(Math.random() * (publicKey.p - 1)) + 1;
		//  a = g^k mod p
		const a = fastModularExponentiation(publicKey.g, k, publicKey.p);
		//  s = y^k mod p
		const s = fastModularExponentiation(publicKey.y, k, publicKey.p);
		//  b = (plainText * s) mod p
		const b = (plainText * s) % publicKey.p;
		// Возвращаем шифротекст
		return { a, b };
	}

	function elGamalDecrypt(
		cipherText: ElGamalCipherText,
		privateKey: { x: number },
		p: number
	): number {
		// s = a^x mod p
		const s = fastModularExponentiation(cipherText.a, privateKey.x, p);
		// обратный элемент для s по модулю p
		const invS = fastModularExponentiation(s, p - 2, p);
		// Вычисляем исходный текст как (b * invS) mod p
		const plainText = (cipherText.b * invS) % p;

		return plainText;
	}

	function handleEncrypt() {
		if (validateCipherConditions(keyString)) {
			const p = 353; // a prime number
			const keyPair = generateElGamalKeyPair(p);
			console.log(
				`Public key: p=${keyPair.publicKey.p}, g=${keyPair.publicKey.g}, y=${keyPair.publicKey.y}`
			);
			console.log(`Private key: x=${keyPair.privateKey.x}`);

			const plainText = Number(keyString);
			console.log(`Plain text: ${plainText}`);

			const cipherText = elGamalEncrypt(plainText, keyPair.publicKey);
			console.log(`Cipher text: a=${cipherText.a}, b=${cipherText.b}`);

			const decryptedText = elGamalDecrypt(cipherText, keyPair.privateKey, p);
			setSelectedItem("");
			setEncryptedItem(String(decryptedText));
		}
	}

	return (
		<Box>
			<Box marginRight={1}>
				<Text>Enter number to encrypt:</Text>
			</Box>
			<TextInput
				value={keyString}
				onChange={(e: string) => (isNaN(Number(e)) ? null : setKeyString(e))}
				onSubmit={handleEncrypt}
			/>
		</Box>
	);
};
