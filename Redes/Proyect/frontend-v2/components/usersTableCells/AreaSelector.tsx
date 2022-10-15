import React, { useState, useCallback, useEffect } from "react";
import useUserAvailableAreas from "@hooks/area/useUserAvailableAreas";

import { Classes, Popover2 } from "@blueprintjs/popover2";
import { Button, MenuItem, Intent, H5 } from "@blueprintjs/core";
import { ItemRenderer, Select2, Select2Props } from "@blueprintjs/select";
import { IArea } from "types/area";
import { IUser } from "types/user";
import useAddUserArea from "@hooks/user/useAddUserArea";
import Notifications from "../Notifications";

import styles from "../../styles/AreaSelector.module.css";

const AreaSelect = Select2.ofType<IArea>();

interface AreaSelectorProps {
	_id: string;
	user: IUser;
}

// eslint-disable-next-line import/no-default-export
const AreaSelector = ({ user, _id }: AreaSelectorProps) => {
	console.log(_id);
	const [toasts, setToasts] = useState<any>([]);
	const [areas, setAreas] = useState<IArea[]>([]);
	const [open, setOpen] = useState<boolean>(false);
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
	}, [isError, isSuccess, addAreaToUserIsSuccess, addAreaToUserIsError, data]);

	const itemRenderer = useCallback<ItemRenderer<IArea>>(
		(area, props) => {
			return (
				<MenuItem
					{...props}
					text={area.name}
					selected={area === selectedArea}
					onClick={() => {
						console.log(area);
						setSelectedArea(area);
					}}
				></MenuItem>
			);
		},
		[selectedArea]
	);
	const attempt = (
		<div className={styles.popover}>
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
					onClick={() => {
						setOpen(false);
					}}
					style={{ marginRight: 10 }}
				>
					Cancel
				</Button>
				<Button
					intent={Intent.SUCCESS}
					onClick={() => {
						mutate();
						setOpen(false);
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
			<Notifications toasts={toasts} setToasts={setToasts} />
			<Popover2
				content={attempt}
				captureDismiss={true}
				popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
				enforceFocus={true}
				isOpen={open}
			>
				<Button
					small={true}
					intent={Intent.SUCCESS}
					onClick={() => {
						setOpen(!open);
					}}
				>
					Agregar area
				</Button>
			</Popover2>
		</>
	);
};
export default AreaSelector;
