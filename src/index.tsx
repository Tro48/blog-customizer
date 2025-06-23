import clsx from 'clsx';
import { CSSProperties, StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line import/namespace
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Article } from './components/article/Article';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const App = () => {
	const [articleProps, setArticleProps] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleProps.fontFamilyOption.value,
					'--font-size': articleProps.fontSizeOption.value,
					'--font-color': articleProps.fontColor.value,
					'--container-width': articleProps.contentWidth.value,
					'--bg-color': articleProps.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleProps={setArticleProps} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
