import { Button, Intent, Tag } from "@blueprintjs/core";
import useDeleteDocument from "@hooks/document/useDeleteDocument";
import useDocument from "@hooks/document/useDocument";
import { Method } from "axios";
import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import * as React from "react";
import { IDocument } from "types";
import styles from "../styles/Metadata.module.css";
import Notifications from "./Notifications";

interface DocProps {
	doc: IDocument;
}

const DocPreview: React.FC<DocProps> = ({ doc }) => {
	const [toast, setToast] = React.useState<any>(null);
	const localDateTime = new Date(doc.createdAt);
	localDateTime.setTime(localDateTime.getTime());
	const formattedDateTime = localDateTime.toLocaleString("es-MX", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
	const formattedHourTime = localDateTime.toLocaleString("es-MX", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	const { mutate, isError, isSuccess } = useDeleteDocument({
		documentId: doc._id,
	});
	React.useEffect(() => {
		if (isSuccess) {
			setToast({
				message: "Documento eliminado",
				type: "success",
			});
		}
		if (isError) {
			setToast({
				message: "Error al eliminar documento",
				type: "danger",
			});
		}
	}, [isError, isSuccess]);
	return (
		<>
			<Notifications toast={toast} setToast={setToast} />
			<div className={styles.box}>
				<div className={styles.item}>
					<span className={styles.title}>Título:</span>
					<span>{doc.title}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Creado por:</span>
					<span>{doc.createdBy.username}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Fecha de Creación:</span>
					<span>{formattedDateTime}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Hora de Creación:</span>
					<span>{formattedHourTime}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Area:</span>
					<span>{doc.area ? doc.area.name : "Sin Area"}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Expediente:</span>
					<span>{doc.expediente}</span>
				</div>
				<div className={styles.item}>
					<span className={styles.title}>Folio:</span>
					<span>{doc.folio}</span>
				</div>
				{doc.metadata
					? Object.entries(doc.metadata).map(([key, value]) => {
							return (
								<>
									<div className={styles.item}>
										<span className={styles.title}>{key}:</span>
										<span>{value}</span>
									</div>
								</>
							);
					  })
					: null}
				<div className={styles.item}>
					<span className={styles.title}>Tags:</span>
					{doc.tags.length != 0 ? (
						doc.tags.map((tag) => (
							<Tag style={{ marginLeft: "2px" }}>{tag.name}</Tag>
						))
					) : (
						<span>No Hay Tags</span>
					)}
				</div>
				{doc.hasFile ? (
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							margin: "10px",
						}}
					>
						<span
							className={styles.title}
							style={{
								marginBottom: "10px",
							}}
						>
							Vista Previa
						</span>
						<iframe
							style={{
								width: "90%",
								height: "500px",
							}}
							id="inlineFrame"
							title={document.title}
							src={`http://localhost:8090/api/docs/preview/${doc._id}`}
						></iframe>
					</div>
				) : null}
				<Button intent={Intent.DANGER} onClick={() => mutate()}>
					Borrar Documento
				</Button>
			</div>
		</>
	);
};
export default DocPreview;
