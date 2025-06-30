import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../components/article-params-form/ArticleParamsForm';
import { Article } from '../components/article/Article';
import { defaultArticleState } from '../constants/articleProps';

import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleProps, setArticleProps] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleProps.fontFamilyOption.value,
					'--font-size': articleProps.fontSizeOption.value,
					'--font-color': articleProps.fontColor.value,
					'--container-width': articleProps.contentWidth.value,
					'--bg-color': articleProps.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setArticleProps={setArticleProps}
				states={articleProps}
			/>
			<Article />
		</main>
	);
};
