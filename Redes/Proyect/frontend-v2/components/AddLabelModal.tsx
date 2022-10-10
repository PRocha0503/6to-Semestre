import {
	Button,
	Label,
	InputGroup,
	Dialog,
	Intent,
	Tag,
} from "@blueprintjs/core";
import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16";
import useAddTag from "@hooks/tags/useAddTag";
import { useEffect, useState } from "react";
import { SliderPicker } from "react-color";
import { IconSelect } from "./IconSelect";

interface AddUserModalProps {
	open: boolean;
	areaName: string;
	addToast: (message: string, type: string) => void;
	onClose: any;
}

const AddLabelModal = ({
	open,
	areaName,
	addToast,
	onClose,
}: AddUserModalProps) => {
	const [color, setColor] = useState<string>("#000");
	const [name, setName] = useState<string>("");
	const [icon, setIcon] = useState<BlueprintIcons_16Id | undefined>("bookmark");
	const { mutate, isError, isLoading, isSuccess, error } = useAddTag({
		color,
		name,
		icon: icon as string,
		areaName,
	});
	useEffect(() => {
		if (isSuccess) {
			addToast("Tag added successfully", "success");
			onClose();
		}
		if (isError) {
			addToast("Error adding tag", "danger");
		}
	}, [isSuccess, isError]);
	return (
		<Dialog
			autoFocus
			canEscapeKeyClose
			canOutsideClickClose={false}
			enforceFocus
			isOpen={open}
			onClose={() => onClose()}
			title={`Añadir Etiqueta a ${areaName}`}
			isCloseButtonShown
			icon="user"
			transitionDuration={300}
		>
			<div style={{ padding: "15px" }}>
				<Label>Nombre</Label>
				<InputGroup
					style={{
						marginBottom: "15px",
					}}
					asyncControl={true}
					leftIcon="label"
					onChange={(e) => {
						setName(e.target.value);
					}}
					placeholder="Nombre de la etiqueta"
					value={name}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<div
						style={{
							width: "50%",
						}}
					>
						<SliderPicker
							color={color}
							onChangeComplete={(c: any) => {
								console.log(c.hex);
								setColor(c.hex);
							}}
						/>
					</div>
				</div>

				<IconSelect iconName={icon} onChange={(i) => setIcon(i)} />
				<Label>Vista Previa</Label>
				<div
					style={{
						display: "flex",
						width: "100%",
						justifyContent: "center",
					}}
				>
					<Tag style={{ backgroundColor: color }} icon={icon}>
						{name}
					</Tag>
				</div>
			</div>
			<div
				style={{
					width: "90%",
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Button
					disabled={name === "" || icon === undefined}
					intent={Intent.SUCCESS}
					onClick={() => {
						mutate();
						onClose();
					}}
					loading={isLoading}
				>
					Aggregar Etiqueta
				</Button>
			</div>
		</Dialog>
	);
};
export default AddLabelModal;
