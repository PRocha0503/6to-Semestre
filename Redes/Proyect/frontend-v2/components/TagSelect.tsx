import { Classes, Intent, TagProps } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select';
import { MenuItem2 } from "@blueprintjs/popover2";
import { Popover2 } from "@blueprintjs/popover2";
import React from 'react';

import TagClasses from '../styles/Tag.module.css';

import type { ITag } from 'types';


const TagSelect = MultiSelect2.ofType<ITag>();

interface TagSelectorProps {
    dark?: boolean;
    tags: ITag[];
    selectedTags: ITag[];
    onChangeSelectedTags: (tags: ITag[]) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ dark, tags=[], selectedTags, onChangeSelectedTags }) => {
    const [query, setQuery] = React.useState<string>("");

    const popeverRef = React.useRef<Popover2<any>>(null);

    const tagRenderer = (tag: ITag): React.ReactNode => {
        return tag.name
    }

    const itemPredicate = (query: string, tag: ITag): boolean => {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }

    const handleTagSelect = (tag: ITag) => {
        setQuery("");
        // already selected
        if (selectedTags.find((v) => v.name === tag.name) || 0 > 0) {
            handleTagUnselect(tag);
            return
        }

        onChangeSelectedTags([...selectedTags, tag]);
    }

    const handleTagUnselect = (value: ITag) => {
        onChangeSelectedTags(selectedTags.filter((v, _) => v.name !== value.name));

    };

    const isTagSelected = (tag: ITag): boolean => {
        return selectedTags.findIndex((v) => v.name === tag.name) !== -1;
    }

    const itemRenderer: ItemRenderer<ITag> = (tag, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem2
                {...props.modifiers}
                key={"item_" + tag.name}
                shouldDismissPopover={false}
                text={tag.name}
                roleStructure="listoption"
                selected={isTagSelected(tag)}
                onClick={handleTagSelect.bind(null, tag)}
            />
        );
    }

    const areTagsEqual = (tag1: ITag, tag2: ITag) => {
        return tag1.name === tag2.name;
    }

    const getTagProps = (_value: React.ReactNode, index: number): TagProps => ({
        intent: Intent.PRIMARY,
        icon: selectedTags[index].icon,
        minimal: true,
        // style: MapColorToStyle(selectedTags[index].color),
    })

    const handleClear = () => {
        onChangeSelectedTags([]);
    }

    return (
        <TagSelect
            items={tags}
            itemRenderer={itemRenderer}
            itemPredicate={itemPredicate}
            onItemSelect={handleTagSelect}
            itemsEqual={areTagsEqual}
            onRemove={handleTagUnselect}
            onClear={handleClear}
            onQueryChange={setQuery}
            resetOnQuery={false}
            query={query}
            tagRenderer={tagRenderer}
            openOnKeyDown={false}
            resetOnSelect={false}
            selectedItems={selectedTags}
            scrollToActiveItem={true}
            menuProps={{ "aria-label": "tags" }}
            popoverProps={{ minimal: true, matchTargetWidth: true, popoverClassName: dark ? Classes.DARK : "", className: TagClasses.popover }}
            popoverRef={popeverRef}
            tagInputProps={{ fill: false, large: true, leftIcon: "tag", className: Classes.INPUT_GHOST, tagProps: getTagProps}}
            noResults={<MenuItem2 disabled={true} text="No results." roleStructure="listoption" className={dark ? Classes.DARK : ""} />}
        />
    )
}