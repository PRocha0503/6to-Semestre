import {
	AnchorButton,
	FileInput,
	Icon,
	InputGroup,
	Label,
	MultistepDialog,
	DialogStep,
	MenuItem,
	Button,
	Tag,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import Notifications from "@components/Notifications";
import { TagSelector } from "@components/TagSelect";
import useCreateDocument, {
	CreateDocumentRequest,
} from "@hooks/document/useCreateDocument";
import { ItemRenderer, Select2 } from "@blueprintjs/select";

import { useUser } from "@hooks/user";
import useGetProfile from "@hooks/user/useGetProfile";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/newDocument.module.css";

interface Props {
	request: CreateDocumentRequest;
	setRequest: (request: CreateDocumentRequest) => void;
}

const FileData = ({ request, setRequest }: Props) => {
	const user = useUser();
	const [profile, setProfile] = useState<any>(null);
	const [area, setArea] = useState<any>({
		name: "",
		tags: [],
	});
	const [tags, setTags] = useState<any>([]);

	const { data: p, isError, isSuccess } = useGetProfile();

	useEffect(() => {
		if (isSuccess) {
			setProfile(p);
		}
	}, [profile, isSuccess]);
	if (!profile) return null;

	const renderArea = (area: any) => {
		return (
			<Button
				onClick={() => {
					setArea(area);
				}}
			>
				{area.name}
			</Button>
		);
	};
	return (
		<>
			<div className={styles.center}>
				<div className={styles.textInputs}>
					<h1 className="bp4-heading">Subir Archivo </h1>
					<Label as="h1">Los apartados marcados con * son obligatorios</Label>

					<div className={styles.textInput}>
						<InputGroup
							large={true}
							fill={false}
							type="text"
							leftElement={<Icon icon="document" />}
							placeholder="Titulo*"
							value={request.title}
							onChange={(e) => {
								setRequest({
									...request,
									title: e.target.value,
								});
							}}
						/>
					</div>

					<div className={styles.textInput}>
						<InputGroup
							large={true}
							fill={false}
							type="text"
							leftElement={<Icon icon="folder-close" />}
							placeholder="Expediente*"
							value={request.expediente}
							onChange={(e) => {
								setRequest({
									...request,
									expediente: e.target.value,
								});
							}}
						/>
					</div>

					<div className={styles.textInput}>
						<InputGroup
							large={true}
							type="folio"
							leftElement={<Icon icon="numerical" />}
							placeholder="Folio*"
							value={request.folio}
							onChange={(e) => {
								setRequest({
									...request,
									folio: e.target.value,
								});
							}}
						/>
					</div>

					<div className={styles.textInput}>
						<DateInput
							fill={true}
							showActionsBar={true}
							timePickerProps={{ precision: "minute" }}
							placeholder="Fecha*"
							formatDate={(date) => date.toLocaleString()}
							todayButtonText="Hoy"
							parseDate={(str) => new Date(str)}
							value={request.createdAt}
							onChange={(date: Date | null, userChaned: boolean) => {
								setRequest({
									...request,
									createdAt: date || new Date(),
								});
							}}
						/>
					</div>
					<Select2<any>
						disabled={false}
						items={profile.areas.map((area: any) => area)}
						itemRenderer={renderArea}
						noResults={<MenuItem disabled={true} text="No results" />}
						onItemSelect={(item) => {
							console.log(item);
						}}
						filterable={false}
						popoverProps={{ minimal: true }}
					>
						<Button fill={true} text={area.name} rightIcon="caret-down" />
					</Select2>
					{area && area.tags.length > 0 ? (
						<TagSelector
							tags={area.tags.map((tag: any) => {
								return {
									name: tag.name,
								};
							})}
							selectedTags={tags}
							onChangeSelectedTags={setTags}
						/>
					) : (
						<></>
					)}
					{tags.map((t: any) => {
						return <Tag>{t}</Tag>;
					})}
					<div className={styles.textInput}>
						<InputGroup
							large={true}
							type="text"
							leftElement={<Icon icon="tag" />}
							placeholder="Etiquetas*"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default FileData;
