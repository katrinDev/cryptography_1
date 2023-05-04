import React, { useState } from "react";
import { Text } from "ink";
import { Menu } from "./Menu";
import { LSB } from "./LSB";
import { RSA } from "./RSA";

export const App = () => {
	const [selectedItem, setSelectedItem] = useState<string>();
	const [encryptedItem, setEncryptedItem] = useState<string>();

	switch (selectedItem) {
		case "LSB Encrypt":
			return (
				<LSB
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
				/>
			);
		case "RSA Encrypt":
			return (
				<RSA
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
				/>
			);
		default:
			return (
				<>
					<Text>{encryptedItem}</Text>
					<Menu handleSelectMenuItem={setSelectedItem} />
				</>
			);
	}
};
