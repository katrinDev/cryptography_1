import React, { useState } from "react";
import { Text } from "ink";
import { DeZigZag } from "./DeZigZag";
import { KeyPhrase } from "./KeyPhrase";
import { Menu } from "./Menu";
import { ZigZag } from "./ZigZag";
import { Caezar } from "./Caezar";

export const App = () => {
	const [selectedItem, setSelectedItem] = useState<string>();
	const [encryptedItem, setEncryptedItem] = useState<string>();

	if (selectedItem === "zigzag") {
		return (
			<ZigZag
				setEncryptedItem={setEncryptedItem}
				setSelectedItem={setSelectedItem}
			/>
		);
	} else if (selectedItem === "dezigzag") {
		return <DeZigZag />;
	} else if (selectedItem === "key phrase") {
		return <KeyPhrase />;
	} else if (selectedItem === "caesar encryptor") {
		return <Caezar encryption={true} />;
	} else if (selectedItem === "decrypt caezar") {
		return <Caezar encryption={false} />;
	}

	return (
		<>
			<Text>{encryptedItem}</Text>
			<Menu handleSelectMenuItem={setSelectedItem} />
		</>
	);
};
