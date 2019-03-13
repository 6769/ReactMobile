// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import * as React from 'react';
import * as Ubb from './Core';

/**
 * 处理 [quote] 标签的处理器。
 */
export class QuoteTagHandler extends Ubb.RecursiveTagHandler {

	get supportedTagNames(): string[] { return ['quote', 'quotex'] };

    execCore(innerContent: React.ReactNode, tagData: Ubb.UbbTagData, context: Ubb.UbbCodeContext): React.ReactNode {
 
		const style = {

			padding: '2px 2px 2px 2px',
			backgroundColor: '#F5FAFF',
			border: '1px solid rgb(204,204,204)',
            marginLeft: '0px',
            marginRight: '0px',
            marginTop: '10px',
            maxHeight: '800px',
            overflowY:'auto' as 'auto'
            };

		return <div  style={style}>{innerContent}</div>;
	}
}