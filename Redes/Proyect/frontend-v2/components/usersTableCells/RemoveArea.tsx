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
import deleteUserArea from "@hooks/user/useDeleteUserArea";
import Notifications from "../Notifications";

import styles from "../../styles/RemoveArea.module.css";

const AreaSelect = Select2.ofType<IArea>();

interface AreaSelectorProps {
	_id: string;
	user: IUser;
}

// eslint-disable-next-line import/no-default-export
const RemoveArea = ({ user, _id }: AreaSelectorProps) => {
	const [toasts, setToasts] = useState<any>([]);
	const [areas, setAreas] = useState<IArea[]>(user.areas);
	const [open, setOpen] = useState<boolean>(false);
	const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
	const {
		mutate,
		isSuccess: deleteAreaToUserIsSuccess,
		isError: deleteAreaToUserIsError,
	} = deleteUserArea({
		userId: _id,
		areaId: selectedArea?._id || "",
	});
	useEffect(() => {
		if (deleteAreaToUserIsSuccess) {
			setToasts([
				...toasts,
				{ message: "Area quitada exitosamente", type: "success" },
			]);
		} else if (deleteAreaToUserIsError) {
			setToasts([
				...toasts,
				{ message: "Error quitando area", type: "danger" },
			]);
		}
	}, [deleteAreaToUserIsSuccess, deleteAreaToUserIsError]);

	useEffect(() => {
		setAreas(user.areas);
	}, [user.areas]);

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
					intent={Intent.DANGER}
					onClick={() => {
						mutate();
						setOpen(false);
					}}
					disabled={selectedArea == null ? true : false}
				>
					Quitar
				</Button>
			</div>
		</div>
	);
	return (
		<>
			<Notifications toast={toasts} setToast={setToasts} />
			<Popover2
				content={attempt}
				captureDismiss={true}
				popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
				enforceFocus={true}
				isOpen={open}
			>
				<Button
					small={true}
					intent={Intent.DANGER}
					onClick={() => {
						setOpen(!open);
					}}
				>
					Quitar area
				</Button>
			</Popover2>
		</>
	);
};
export default RemoveArea;
