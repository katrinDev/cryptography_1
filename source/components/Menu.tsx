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
			label: "ElGamal Encrypt",
			value: "ElGamal Encrypt",
		},
	];

	return <SelectInput items={menuItems} onSelect={handleSelect} />;
};
