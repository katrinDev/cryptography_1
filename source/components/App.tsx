import React, { useState } from "react";
import { Text } from "ink";
import { Menu } from "./Menu";
import { ElGamal } from "./ElGamal";

export const App = () => {
	const [selectedItem, setSelectedItem] = useState<string>();
	const [encryptedItem, setEncryptedItem] = useState<string>();

	switch (selectedItem) {
		case "ElGamal Encrypt":
			return (
				<ElGamal
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
				/>
			);
		default:
			return (
				<>
					<Text>Decrypted item: {encryptedItem}</Text>
					<Menu handleSelectMenuItem={setSelectedItem} />
				</>
			);
	}
};
