import React, { useState, useCallback, useEffect } from "react";
import useUserAvailableAreas from "@hooks/area/useUserAvailableAreas";

import {
	Classes,
	Placement,
	PlacementOptions,
	Popover2,
	Popover2InteractionKind,
	Popover2SharedProps,
	StrictModifierNames,
} from "@blueprintjs/popover2";
import { Button, MenuItem, Intent, H5 } from "@blueprintjs/core";
import { ItemRenderer, Select2, Select2Props } from "@blueprintjs/select";
import { IArea } from "types/area";
import { IUser } from "types/user";

const AreaSelect = Select2.ofType<IArea>();

interface AreaSelectorProps {
	_id: string;
	user: IUser;
}

// eslint-disable-next-line import/no-default-export
const AreaSelector = ({ user, _id }: AreaSelectorProps) => {
	const [toasts, setToasts] = useState<any>([]);

	const { data, isLoading, isError, error, isSuccess } =
		useUserAvailableAreas(_id);
	const [areas, setAreas] = useState<IArea[]>([]);

	useEffect(() => {
		if (isError) {
			console.log(error);
			setToasts([
				...toasts,
				{ message: "No se pudieron cargar areas", type: "danger" },
			]);
		} else if (isSuccess && data) {
			const filteredAreas = data.areas.filter((area) => {
				return user.areas.includes(area);
			});
			setAreas(data.areas);
			console.log(data.areas);
		}
	}, [isError, isSuccess]);

	const [selectedFilm, setSelectedFilm] = useState<IArea | null>(null);

	const itemRenderer = useCallback<ItemRenderer<IArea>>(
		(film, props) => {
			return (
				<MenuItem
					{...props}
					text={film.name}
					selected={film === selectedFilm}
					onClick={() => setSelectedFilm(film)}
				></MenuItem>
			);
		},
		[selectedFilm]
	);
	const attempt = (
		<div style={{ padding: 15 }}>
			<H5>Agregar Area a usuario</H5>
			<p>Seleciona un area para agregar al usuario.</p>
			<AreaSelect
				className={Classes.POPOVER2_OPEN}
				itemRenderer={itemRenderer}
				items={areas}
				menuProps={{ "aria-label": "areas" }}
				noResults={
					<MenuItem
						disabled={true}
						text="No results."
						roleStructure="listoption"
					/>
				}
				onItemSelect={(e) => {
					console.log(e);
					setSelectedFilm(e);
				}}
			>
				<Button
					icon="film"
					rightIcon="caret-down"
					text={selectedFilm ? `${selectedFilm.name}` : "No selection"}
					loading={isLoading}
				/>
			</AreaSelect>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: 15,
					marginBottom: 15,
				}}
			>
				<Button className={Classes.POPOVER2_OPEN} style={{ marginRight: 10 }}>
					Cancel
				</Button>
				<Button intent={Intent.SUCCESS} className={Classes.POPOVER2_DISMISS}>
					Agregar
				</Button>
			</div>
		</div>
	);
	return (
		<>
			<Popover2 content={attempt} captureDismiss={true}>
				<div>Agregar area</div>
			</Popover2>
		</>
	);
};
export default AreaSelector;
