/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();
	return (
		<p>
			<div>
				<div>
					Question:
					<input
						type="text"
						value={attributes.question}
						onChange={e => {
							setAttributes({ question: e.target.value });
						}}
					/>
				</div>
				<div>
					Options:
					{attributes.options.map((option, optionIndex) => (
						<div>
							<input
								type="text"
								value={option}
								onChange={e => {
									const newOptions = [...attributes.options];
									newOptions[optionIndex] = e.target.value;
									setAttributes({ options: newOptions });
								}}
							/>
							<input type="radio"
								radioGroup='correctAnswer'
								checked={attributes.correctAnswer === optionIndex}
								onChange={e => {
									if (e.target.checked) {
										setAttributes({ correctAnswer: optionIndex });
									}
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</p>
	);
}
