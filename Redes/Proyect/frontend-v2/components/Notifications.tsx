import { Intent, Toaster, Toast } from "@blueprintjs/core";
import styles from "@styles/Notifications.module.css";
const Notifications: React.FC<any> = ({ toast, setToast }) => {
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
			{toast?.map((t: any, i: any) => {
				console.log("t", t);
				return (
					<Toast
						message={t.message}
						icon="error"
						intent={setIntent(t.type)}
						timeout={3000}
						className={styles.toast}
						onDismiss={() => {
							setToast((toast: any) =>
								toast.filter((_: any, index: any) => index !== i)
							);
						}}
					/>
				);
			})}
		</Toaster>
	);
};

export default Notifications;
