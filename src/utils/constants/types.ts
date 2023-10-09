import { ORDER, TYPE_CONTENT } from "./enums";

type Header = {
    title: string,
    width?: number,
    order?: ORDER
}

type Line = Item[];
type Item = ContentItem[];

type ContentItem = {
    content: string,
    color?: string
    type?: TYPE_CONTENT[],
    isBadge?: boolean,
}


export type { Header, Item, ContentItem, Line }