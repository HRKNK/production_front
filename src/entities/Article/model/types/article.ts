export enum ArticleBlockType {
	CODE = 'CODE',
	IMAGE = 'IMAGE',
	TEXT = 'TEXT',
}

export interface ArticleBlockBase { // одинаковые поля в статьях
	id: string;
	type: ArticleBlockType; // перечисление типов статей
}
//
export interface ArticleCodeBlock extends ArticleBlockBase {
	type: ArticleBlockType.CODE; // тип блока статьи
	code: string;
}
export interface ArticleImageBlock extends ArticleBlockBase {
	type: ArticleBlockType.IMAGE; // тип блока статьи
	src: string;
	title: string;
}
export interface ArticleTextBlock extends ArticleBlockBase {
	type: ArticleBlockType.TEXT; // тип блока статьи
	paragraphs: string[];
	title?: string;
}
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock; // объединяющий тип
//

export enum ArticleType { // тема статей
	IT = 'IT',
	SCIENCE = 'SCIENCE',
	ECONOMICS = 'ECONOMICS',
}

export interface Article {
	id: string;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[]; // тема статей
	blocks: ArticleBlock[]; // тип блока статьи
}