import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select';
import { Button, MenuItem, Tag, Classes } from "@blueprintjs/core";
import React from 'react';

const TagSelect = MultiSelect2.ofType<ITag>();


export const TagSelector = () => {
    const [tags, setTags] = React.useState<ITag[]>([
        { name: "tag1" },
        { name: "tag2" },
        { name: "tag3" },

    ]);

    const [selectedTags, setSelectedTags] = React.useState<ITag[]>([]);

    const tagRenderer = (tag: ITag): React.ReactNode => {
        return <Tag minimal={true} color="red">{tag.name}</Tag>;
    }

    const itemPredicate = (query: string, tag: ITag): boolean => {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }

    const handleTagRemove = (_tag: React.ReactNode, index: number) => {
        // deselectFilm(index);
    };

    const itemRenderer: ItemRenderer<ITag> = (tag, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                shouldDismissPopover={false}
                text={tag.name}
            />
        );
    }

    return (
        <TagSelect
            items={tags}
            itemRenderer={itemRenderer}
            itemPredicate={itemPredicate}
            onItemSelect={() => null}
            selectedItems={selectedTags}
            tagRenderer={tagRenderer}
            menuProps={{ "aria-label": "tags" }}
            tagInputProps={{ fill: true, large: true, onRemove: handleTagRemove, leftIcon: "search", className: Classes.ROUND }}
            noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
        />
    )
}