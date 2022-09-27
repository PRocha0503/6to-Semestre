import { Classes, FormGroup, Intent, TagProps } from "@blueprintjs/core";
import { ItemRenderer, MultiSelect2 } from '@blueprintjs/select';
import { MenuItem2 } from "@blueprintjs/popover2";
import { Popover2 } from "@blueprintjs/popover2";
import React from 'react';

import TagClasses from '../styles/Tag.module.css';

import type { ITag, ITagForm } from 'types';


const TagSelect = MultiSelect2.ofType<ITagForm>();

interface TagSelectorProps {
    dark?: boolean;
    tags: ITagForm[];
    selectedTags: ITagForm[];
    onChangeSelectedTags: (tags: ITagForm[]) => void;
}

const MaxSubtringLength = 10;

export const TagSelector: React.FC<TagSelectorProps> = ({ dark, tags=[], selectedTags, onChangeSelectedTags }) => {
    const [query, setQuery] = React.useState<string>("");

    const popeverRef = React.useRef<Popover2<any>>(null);

    const tagRenderer = (tag: ITagForm): React.ReactNode => {
        return cropText(tag.name, MaxSubtringLength)
    }

    const itemPredicate = (query: string, tag: ITagForm): boolean => {
        return tag.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    }

    const handleTagSelect = (tag: ITagForm) => {
        setQuery("");
        // already selected
        if (selectedTags.find((v) => v.name === tag.name) || 0 > 0) {
            handleTagUnselect(tag);
            return
        }

        onChangeSelectedTags([...selectedTags, tag]);
    }

    const handleTagUnselect = (value: ITagForm) => {
        onChangeSelectedTags(selectedTags.filter((v, _) => v.name !== value.name));

    };

    const isTagSelected = (tag: ITagForm): boolean => {
        return selectedTags.findIndex((v) => v.name === tag.name) !== -1;
    }

    const cropText = (text: string, length: number): string => {
        return text.substring(0, length) + (text.length > length ? "..." : "");
    }

    const itemRenderer: ItemRenderer<ITagForm> = (tag, props) => {
        if (!props.modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem2
                {...props.modifiers}
                key={"item_" + tag.name}
                shouldDismissPopover={false}
                text={cropText(tag.name, MaxSubtringLength)}
                roleStructure="listoption"
                selected={isTagSelected(tag)}
                onClick={handleTagSelect.bind(null, tag)}
            />
        );
    }

    const areTagsEqual = (tag1: ITagForm, tag2: ITagForm) => {
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
            className={TagClasses.tagSelect}
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
            popoverProps={{ minimal: true, matchTargetWidth: false, popoverClassName: dark ? Classes.DARK : "", className: TagClasses.popover }}
            popoverRef={popeverRef}
            tagInputProps={{ fill: false, large: true, leftIcon: "tag", className: Classes.INPUT_GHOST, tagProps: getTagProps}}
            noResults={<MenuItem2 disabled={true} text="Sin resultados." roleStructure="listoption" className={dark ? Classes.DARK : ""} />}
        />
    )
}