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
import useAddUserArea from "@hooks/user/useAddUserArea";
import Notifications from "./Notifications";

const AreaSelect = Select2.ofType<IArea>();

interface AreaSelectorProps {
	_id: string;
	user: IUser;
}

// eslint-disable-next-line import/no-default-export
const AreaSelector = ({ user, _id }: AreaSelectorProps) => {
	const [toasts, setToasts] = useState<any>([]);
	const [areas, setAreas] = useState<IArea[]>([]);
	const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
	const { data, isLoading, isError, error, isSuccess } =
		useUserAvailableAreas(_id);
	const {
		mutate,
		isSuccess: addAreaToUserIsSuccess,
		isError: addAreaToUserIsError,
	} = useAddUserArea({
		userId: _id,
		areaId: selectedArea?._id || "dd",
	});
	console.log(_id);
	useEffect(() => {
		if (isError) {
			console.log(error);
			setToasts([
				...toasts,
				{ message: "No se pudieron cargar areas", type: "danger" },
			]);
		} else if (isSuccess && data) {
			setAreas(data.areas);
		}
		if (addAreaToUserIsSuccess) {
			setToasts([...toasts, { message: "Area añadida", type: "success" }]);
		} else if (addAreaToUserIsError) {
			setToasts([
				...toasts,
				{ message: "Error añadiendo area", type: "danger" },
			]);
		}
	}, [isError, isSuccess, addAreaToUserIsSuccess, addAreaToUserIsError]);

	const itemRenderer = useCallback<ItemRenderer<IArea>>(
		(film, props) => {
			return (
				<MenuItem
					{...props}
					text={film.name}
					selected={film === selectedArea}
					onClick={() => setSelectedArea(film)}
				></MenuItem>
			);
		},
		[selectedArea]
	);
	const attempt = (
		<div style={{ padding: 15 }}>
			<H5>Agregar Area a usuario</H5>
			<p>Seleciona un area para agregar al usuario.</p>

			<AreaSelect
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
					setSelectedArea(e);
				}}
			>
				<Button
					icon="group-objects"
					rightIcon="caret-down"
					text={selectedArea ? `${selectedArea.name}` : "No selection"}
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
				<Button
					className={Classes.POPOVER2_DISMISS}
					style={{ marginRight: 10 }}
				>
					Cancel
				</Button>
				<Button
					intent={Intent.SUCCESS}
					onClick={() => {
						mutate();
					}}
					disabled={selectedArea == null ? true : false}
				>
					Agregar
				</Button>
			</div>
		</div>
	);
	return (
		<>
			<Notifications toast={toasts} setToast={setToasts} />
			<Popover2 content={attempt} captureDismiss={true}>
				<div>Agregar area</div>
			</Popover2>
		</>
	);
};
export default AreaSelector;
