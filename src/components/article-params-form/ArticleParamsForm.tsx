import clsx from 'clsx';
import { useRef, useState } from 'react';
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
	setArticleProps: (states: ArticleStateType) => void;
	states: ArticleStateType;
};

export const ArticleParamsForm = ({ setArticleProps, states }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [inputsData, setInputsData] = useState(states);
	const asideRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isModalOpen,
		rootRef: asideRef,
		onChange: setIsModalOpen,
	});
	const setNewInputData = <T extends keyof ArticleStateType>(
		dataType: T,
		value: ArticleStateType[T]
	) => {
		setInputsData((prevInputsData) => ({
			...prevInputsData,
			[dataType]: value,
		}));
	};
	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleProps(inputsData);
	};
	const clearForm = (e: React.FormEvent) => {
		e.preventDefault();
		setInputsData(defaultArticleState);
		setArticleProps(defaultArticleState);
	};
	return (
		<>
			<ArrowButton
				isOpen={isModalOpen}
				onClick={() => {
					setIsModalOpen(!isModalOpen);
				}}
			/>
			<aside
				className={
					isModalOpen
						? clsx(styles.container, styles.container_open)
						: styles.container
				}
				ref={asideRef}>
				<form className={styles.form} onSubmit={submitForm} onReset={clearForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={inputsData.fontFamilyOption}
						placeholder={inputsData.fontFamilyOption.title}
						onChange={(value) => {
							setNewInputData('fontFamilyOption', value);
						}}
					/>
					<RadioGroup
						name={inputsData.fontSizeOption.title}
						options={fontSizeOptions}
						selected={inputsData.fontSizeOption}
						onChange={(value) => {
							setNewInputData('fontSizeOption', value);
						}}
						title='размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={inputsData.fontColor}
						placeholder={inputsData.fontColor.title}
						onChange={(value) => {
							setNewInputData('fontColor', value);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={inputsData.backgroundColor}
						placeholder={inputsData.backgroundColor.title}
						onChange={(value) => {
							setNewInputData('backgroundColor', value);
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={inputsData.contentWidth}
						placeholder={inputsData.contentWidth.title}
						onChange={(value) => {
							setNewInputData('contentWidth', value);
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
