import { useState } from "react";

interface NotificationProps {
    title: string;
    iconDescription: string;
    caption: string;
    timeout: number;
    kind: "success" | "error" | "info" | "warning";
}

const DEFAULT_TIMEOUT = 3000;

export function useTimeoutList<T>(): [list: T[], addTimeoutItem: (item: T, timeout?: number) => void, removeTimeoutItem: (filter: (item: T) => boolean) => void] {
    const [list, setList] = useState<T[]>([]);

    const addTimeoutItem = (item: T, timeout? : number) => {
        setList((prev) => {
            return [...prev, item];
        });
        setTimeout(() => {
            setList((prev) => prev.filter((n) => n !== item));
        },  timeout ?? DEFAULT_TIMEOUT);
    };

    const removeTimeoutItem = (filter: (item: T) => boolean) => {
        setList((prev) => prev.filter(filter));
    };


    return [ list, addTimeoutItem, removeTimeoutItem ];
}

export function useNotification() {
    return useTimeoutList<NotificationProps>();
}