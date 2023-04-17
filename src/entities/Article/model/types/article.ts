import { type ArticleBlockType, type ArticleType } from '../consts/consts';

import { type User } from 'entities/User/public';

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

export interface Article {
	id: string;
	title: string;
	subtitle: string;
	user: User;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[]; // тема статей
	blocks: ArticleBlock[]; // тип блока статьи
}
