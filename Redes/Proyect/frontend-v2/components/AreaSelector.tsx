import * as React from "react";

import { Button, MenuItem } from "@blueprintjs/core";
import { ItemRenderer, Select2, Select2Props } from "@blueprintjs/select";

export interface IFilm {
	/** Title of film. */
	title: string;
	/** Release year. */
	year: number;
}

const FilmSelect = Select2.ofType<IFilm>();

// eslint-disable-next-line import/no-default-export
const AreaSelector = () => {
	const [items, setItems] = React.useState([
		{ title: "The Shawshank Redemption", year: 1994 },
		{ title: "The Godfather", year: 1972 },
		{ title: "The Godfather: Part II", year: 1974 },
		{ title: "The Dark Knight", year: 2008 },
		{ title: "12 Angry Men", year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: "Pulp Fiction", year: 1994 },
	]);
	const [selectedFilm, setSelectedFilm] = React.useState(items[0]);

	const itemRenderer = React.useCallback<ItemRenderer<IFilm>>(
		(film, props) => {
			if (!props.modifiers.matchesPredicate) {
				return null;
			}
			// return <MenuItem {...getFilmItemProps(film, props)} selected={film === selectedFilm} />;
			return <MenuItem {...props} text={film.title} />;
		},
		[selectedFilm]
	);

	return (
		<FilmSelect
			// createNewItemFromQuery={maybeCreateNewItemFromQuery}
			// createNewItemRenderer={maybeCreateNewItemRenderer}
			// fill={fill}
			// itemPredicate={filterFilm}
			itemRenderer={itemRenderer}
			items={items}
			// itemsEqual={areFilmsEqual}
			menuProps={{ "aria-label": "films" }}
			noResults={
				<MenuItem
					disabled={true}
					text="No results."
					roleStructure="listoption"
				/>
			}
			onItemSelect={(e) => {
				console.log(e);
			}}
		>
			<Button
				icon="film"
				rightIcon="caret-down"
				text={
					selectedFilm
						? `${selectedFilm.title} (${selectedFilm.year})`
						: "(No selection)"
				}
			/>
		</FilmSelect>
	);
};
export default AreaSelector;
