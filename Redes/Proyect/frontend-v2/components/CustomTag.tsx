import { Button, H5, Icon, Intent, Switch, Tag } from "@blueprintjs/core";
import { BlueprintIcons_16Id } from "@blueprintjs/icons/lib/esm/generated/16px/blueprint-icons-16";
import useDeleteTag from "@hooks/tags/useDeleteTag";
import { useEffect, useState } from "react";

interface Props {
	tag: ITags;
	addToast: (message: string, type: string) => void;
	areaName: string;
}

export const CustomTag = ({ tag, addToast, areaName }: Props) => {
	console.log(tag);
	const { color, name, _id, icon } = tag;

	const { mutate, isSuccess, isError } = useDeleteTag({
		areaName: areaName,
		tagId: _id,
	});

	useEffect(() => {
		if (isSuccess) {
			addToast("Tag deleted successfully", "success");
		}
		if (isError) {
			addToast("Error deleting tag", "danger");
		}
	}, [isSuccess, isError]);

	return (
		<>
			<Tag
				style={{ backgroundColor: color || "gray", marginRight: "5px" }}
				icon={(icon as BlueprintIcons_16Id) || "bookmark"}
				onRemove={() => mutate()}
			>
				{name}
			</Tag>
		</>
	);
};
