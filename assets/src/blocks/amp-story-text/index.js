/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import getTagName from './get-tag-name';

export const name = 'amp/amp-story-text';

export const settings = {
	title: __( 'Text', 'amp' ),

	description: __( 'Add free-form text to your story', 'amp' ),

	icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 4v3h5.5v12h3V7H19V4z" /><path fill="none" d="M0 0h24v24H0V0z" /></svg>,

	category: 'common',

	keywords: [
		__( 'title', 'amp' ),
		__( 'heading', 'amp' ),
		__( 'paragraph', 'amp' ),
	],

	supports: {
		className: false,
		anchor: true,
	},

	attributes: {
		placeholder: {
			type: 'string',
		},
		content: {
			type: 'string',
			source: 'html',
			selector: 'p,h1,h2',
			default: '',
		},
		type: {
			type: 'string',
			default: 'auto',
		},
		fontSize: {
			type: 'string',
		},
		customFontSize: {
			type: 'number',
		},
		ampFontFamily: {
			type: 'string',
		},
	},

	edit,

	save( { attributes } ) {
		const { content, fontSize, customFontSize } = attributes;

		const tagName = getTagName( attributes );
		const fontSizeClass = fontSize && `is-${ fontSize }-text`;
		const className = fontSizeClass ? fontSizeClass : undefined;

		const styles = {
			fontSize: fontSizeClass ? undefined : customFontSize,
		};

		return (
			<RichText.Content
				tagName={ tagName }
				style={ styles }
				className={ className }
				value={ content }
			/>
		);
	},
};

registerBlockType( name, settings );
