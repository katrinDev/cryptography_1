import React, { FC } from "react";
import SelectInput from "ink-select-input";

export const Menu: FC<{ handleSelectMenuItem: (a: string) => void }> = ({
	handleSelectMenuItem,
}) => {
	const handleSelect = (item: any) => {
		handleSelectMenuItem(item.value);
	};
	const menuItems = [
		{
			label: "Zigzag encryptor",
			value: "zigzag",
		},
		{
			label: "Zigzag decryptor",
			value: "decrypt zigzag",
		},
		{
			label: "Key phrase encryptor",
			value: "key phrase",
		},
		{
			label: "Key phrase decryptor",
			value: "decrypt key phrase",
		},
		{
			label: "Caezar cipher encryptor",
			value: "caezar encrypt",
		},
		{
			label: "Caezar cipher decryptor",
			value: "caezar decrypt",
		},
		{
			label: "Rotating Grid Encrypt",
			value: "Rotating Grid Encrypt",
		},
		{
			label: "Rotating Grid Decrypt",
			value: "Rotating Grid Decrypt",
		},
	];

	return <SelectInput items={menuItems} onSelect={handleSelect} />;
};
