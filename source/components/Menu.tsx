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
			label: "LSB Encrypt",
			value: "LSB Encrypt",
		},
		{
			label: "RSA Encrypt",
			value: "RSA Encrypt",
		},
	];

	return <SelectInput items={menuItems} onSelect={handleSelect} />;
};
