import React, { FC, useEffect } from "react";
import { Box } from "ink";
import { readFile } from "fs/promises";

export const RSA: FC<{
	setEncryptedItem: (a: string) => void;
	setSelectedItem: (a: string) => void;
}> = ({ setSelectedItem, setEncryptedItem }) => {
	function joaatHash(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash += str.charCodeAt(i);
			hash += hash << 10;
			hash ^= hash >>> 6;
		}
		hash += hash << 3;
		hash ^= hash >>> 11;
		hash += hash << 15;
		return hash >>> 0;
	}

	function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
		if (modulus === BigInt(1)) return BigInt(0);
		let result = BigInt(1);
		base = base % modulus;
		while (exponent > 0) {
			if (exponent % BigInt(2) === BigInt(1))
				result = (result * base) % modulus;
			exponent = exponent >> BigInt(1);
			base = (base * base) % modulus;
		}
		return result;
	}

	function generateKeyPair(
		p: bigint,
		q: bigint
	): { publicKey: bigint[]; privateKey: bigint[] } {
		const n = p * q;
		const phi = (p - BigInt(1)) * (q - BigInt(1));

		let e = BigInt(43);
		while (e < phi) {
			if (gcd(e, phi) === BigInt(1)) break;
			e++;
		}

		const d = modInv(e, phi);

		return { publicKey: [e, n], privateKey: [d, n] };
	}

	function gcd(a: bigint, b: bigint): bigint {
		if (!b) return a;
		return gcd(b, a % b);
	}

	function modInv(a: bigint, m: bigint): bigint {
		if (m === BigInt(1)) return BigInt(0);

		let m0 = m;
		let x0 = BigInt(0);
		let x1 = BigInt(1);

		while (a > BigInt(1)) {
			let q = a / m;
			let t = m;

			m = a % m;
			a = t;

			t = x0;

			x0 = x1 - q * x0;

			x1 = t;
		}

		if (x1 < BigInt(0)) x1 += m0;

		return x1;
	}

	async function sign(
		inputFile: string,
		privateKey: bigint[]
	): Promise<bigint> {
		const message = await readFile(inputFile, "utf-8");
		let messageHash = joaatHash(message);
		const signature = modPow(BigInt(messageHash), privateKey[0], privateKey[1]);

		return signature;
	}

	async function verify(
		inputFile: string,
		signature: bigint,
		publicKey: bigint[]
	): Promise<boolean> {
		const message = await readFile(inputFile, "utf-8");
		let messageHash = joaatHash(message);
		const decryptedSignature = modPow(signature, publicKey[0], publicKey[1]);

		return decryptedSignature === BigInt(messageHash);
	}
	async function handleEncrypt() {
		const p = BigInt("670037");
		const q = BigInt("670039");

		const keyPair = generateKeyPair(p, q);

		console.log("Открытый ключ:", keyPair.publicKey);
		console.log("Закрытый ключ:", keyPair.privateKey);

		const inputFile = "input.txt";

		const signature = await sign(inputFile, keyPair.privateKey);

		console.log("ЭЦП:", signature);

		const isValidSignature = await verify(
			inputFile,
			signature,
			keyPair.publicKey
		);
		const secondFile = "input2.txt";
		const isValidSignature2 = await verify(
			secondFile,
			signature,
			keyPair.publicKey
		);

		console.log(
			"Результат проверки ЭЦП оригинального файла:",
			isValidSignature
		);
		console.log("Результат проверки ЭЦП второго файла:", isValidSignature2);
		setSelectedItem("");
		setEncryptedItem("Encrypted");
	}

	useEffect(() => {
		handleEncrypt();
	}, []);

	return <Box></Box>;
};