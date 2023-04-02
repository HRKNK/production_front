// <Адрес страницы, позиция скролла PX>
export type ScrollSchema = Record<string, number>;

export interface ScrollSaveSchema {
	scroll: ScrollSchema;
}
