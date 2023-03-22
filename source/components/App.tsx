import React, { useState } from "react";
import { Text } from "ink";
import { DeZigZag } from "./DeZigZag";
import { KeyPhrase } from "./KeyPhrase";
import { Menu } from "./Menu";
import { ZigZag } from "./ZigZag";
import { Caezar } from "./Caezar";
import { DeKeyPhrase } from "./DeKeyPhrase";
import { RotatingGrid } from "./RotatingGrid";

export const App = () => {
	const [selectedItem, setSelectedItem] = useState<string>();
	const [encryptedItem, setEncryptedItem] = useState<string>();

	switch (selectedItem) {
		case "zigzag":
			return (
				<ZigZag
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
				/>
			);
		case "dezigzag":
			return <DeZigZag />;
		case "key phrase":
			return <KeyPhrase />;
		case "decrypt key phrase":
			return <DeKeyPhrase />;
		case "caesar encrypt":
			return <Caezar encryption={true} />;
		case "caesar decrypt":
			return <Caezar encryption={false} />;
		case "Rotating Grid Encrypt":
			return (
				<RotatingGrid
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
					encryption={true}
				/>
			);
		case "Rotating Grid Decrypt":
			return (
				<RotatingGrid
					setEncryptedItem={setEncryptedItem}
					setSelectedItem={setSelectedItem}
					encryption={false}
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
