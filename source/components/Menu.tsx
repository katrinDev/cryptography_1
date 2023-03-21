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
			value: "caezar",
		},
		{
			label: "Caezar cipher decryptor",
			value: "decrypt caezar",
		},
	];

	return <SelectInput items={menuItems} onSelect={handleSelect} />;
};
