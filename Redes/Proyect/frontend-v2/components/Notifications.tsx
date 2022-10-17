import { Intent, Toast, Toaster } from "@blueprintjs/core";
import styles from "@styles/Notifications.module.css";
import { useState } from "react";

interface Notification {
	  message: string;
	  type: Intent;
}

interface Props {
	toasts: Notification[];
	setToasts: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const Notifications: React.FC<Props> = ({ toasts, setToasts }) => {
	useState
	const setIntent = (intent: string) => {
		switch (intent) {
			case "success":
				return Intent.SUCCESS;
			case "warning":
				return Intent.WARNING;
			case "danger":
				return Intent.DANGER;
			default:
				return Intent.SUCCESS;
		}
	};
	return (
		<Toaster>
			{toasts.map((t: Notification, i: number) => {
				console.log("t", t);
				return (
					<Toast
						key={i}
						message={t.message}
						icon="error"
						intent={setIntent(t.type)}
						timeout={3000}
						className={styles.toast}
						onDismiss={() => {
							setToasts((prev) => prev.filter((_, index) => index !== i))
						}}
					/>
				);
			})}
		</Toaster>
	);
};

export default Notifications;
