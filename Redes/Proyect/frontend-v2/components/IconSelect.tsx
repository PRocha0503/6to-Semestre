import classNames from "classnames";
import * as React from "react";

import { Alignment, Button, Classes, MenuItem } from "@blueprintjs/core";
import { IconName, IconNames } from "@blueprintjs/icons";
import { ItemRenderer, Select2 } from "@blueprintjs/select";

const NONE = "(none)";
type IconNameOrNone = IconName | typeof NONE;
function getIconNames(): IconNameOrNone[] {
	const iconNames = new Set<IconNameOrNone>();
	for (const [, name] of Object.entries(IconNames)) {
		iconNames.add(name);
	}
	iconNames.add(NONE);
	return Array.from(iconNames.values());
}

const ICON_NAMES = getIconNames();

export interface IIconSelectProps {
	disabled?: boolean;
	iconName?: IconName;
	onChange: (iconName?: IconName) => void;
}

export class IconSelect extends React.PureComponent<IIconSelectProps> {
	public render() {
		const { disabled, iconName } = this.props;
		return (
			<label
				className={classNames(Classes.LABEL, { [Classes.DISABLED]: disabled })}
			>
				Icon
				<Select2<IconNameOrNone>
					disabled={disabled}
					items={ICON_NAMES}
					itemPredicate={this.filterIconName}
					itemRenderer={this.renderIconItem}
					noResults={<MenuItem disabled={true} text="No results" />}
					onItemSelect={this.handleIconChange}
					popoverProps={{ minimal: true }}
				>
					<Button
						alignText={Alignment.LEFT}
						className={Classes.TEXT_OVERFLOW_ELLIPSIS}
						disabled={disabled}
						fill={true}
						icon={iconName}
						text={iconName || NONE}
						rightIcon="caret-down"
					/>
				</Select2>
			</label>
		);
	}

	private renderIconItem: ItemRenderer<IconName | typeof NONE> = (
		icon,
		{ handleClick, handleFocus, modifiers }
	) => {
		if (!modifiers.matchesPredicate) {
			return null;
		}
		return (
			<MenuItem
				selected={modifiers.active}
				icon={icon === NONE ? undefined : icon}
				key={icon}
				onClick={handleClick}
				onFocus={handleFocus}
				text={icon}
			/>
		);
	};

	private filterIconName = (
		query: string,
		iconName: IconName | typeof NONE
	) => {
		if (iconName === NONE) {
			return true;
		}
		if (query === "") {
			return true;
		}
		return iconName.toLowerCase().indexOf(query.toLowerCase()) >= 0;
	};

	private handleIconChange = (icon: IconNameOrNone) =>
		this.props.onChange(icon === NONE ? undefined : icon);
}
