import { useLayoutEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
type Props = {
	setArticleProps: (sttates: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: Props) => {
	const { setArticleProps } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [inputsData, setInputsData] = useState(defaultArticleState);
	const asideRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});
	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleProps(inputsData);
	};
	const clearForm = (e: React.FormEvent) => {
		e.preventDefault();
		setInputsData(defaultArticleState);
		setArticleProps(defaultArticleState);
	};
	useLayoutEffect(() => {
		const aside = asideRef.current;
		isOpen && aside?.classList.add(styles.container_open);
		return () => {
			aside?.classList.remove(styles.container_open);
		};
	}, [isOpen]);
	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={styles.container} ref={asideRef}>
				<form className={styles.form} onSubmit={submitForm} onReset={clearForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={inputsData.fontFamilyOption}
						placeholder={inputsData.fontFamilyOption.title}
						onChange={(value) => {
							setInputsData((prevInputsData) => ({
								...prevInputsData,
								fontFamilyOption: (prevInputsData.fontFamilyOption = value),
							}));
						}}
					/>
					<RadioGroup
						name={inputsData.fontSizeOption.title}
						options={fontSizeOptions}
						selected={inputsData.fontSizeOption}
						onChange={(value) => {
							setInputsData((prevInputsData) => ({
								...prevInputsData,
								fontSizeOption: (prevInputsData.fontSizeOption = value),
							}));
						}}
						title='размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputsData.fontColor}
						placeholder={inputsData.fontColor.title}
						onChange={(value) => {
							setInputsData((prevInputsData) => ({
								...prevInputsData,
								fontColor: (prevInputsData.fontColor = value),
							}));
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputsData.backgroundColor}
						placeholder={inputsData.backgroundColor.title}
						onChange={(value) => {
							setInputsData((prevInputsData) => ({
								...prevInputsData,
								backgroundColor: (prevInputsData.backgroundColor = value),
							}));
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputsData.contentWidth}
						placeholder={inputsData.contentWidth.title}
						onChange={(value) => {
							setInputsData((prevInputsData) => ({
								...prevInputsData,
								contentWidth: (prevInputsData.contentWidth = value),
							}));
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
