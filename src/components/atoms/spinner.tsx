import { memo } from 'react';
import styled from '@emotion/styled';
import { globalColorDefault } from '../../libs/variables';

export interface IPropsContanerSpinner {
	display?: string;
	margin?: string;
	jcontent?: boolean;
}

export interface IPropsBounce {
	background: string;
	size?: string;
}

const ContainerSpinner = styled.div<IPropsContanerSpinner>`
	display: ${(props) => props.display};
	margin: ${props => props.margin};
	justify-content: ${(props) => props.jcontent ? 'space-around' : ''};
	width: 50px;
`;

const Bounce = styled.div < IPropsBounce>`
	background: ${(props) => props.background};
	width: ${(props) => props.size ? props.size : '18px'} !important;
	height: ${(props) => props.size ? props.size : '18px'} !important;
`;

export interface ISpinner {
	style?: any;
	color?: string;
	small?: boolean;
	animation?:  'spinner' | 'pulse';
	size?: string;
}

function _Spinner(props: ISpinner) {
	const { style = {}, small, animation, size } = props;
	if (small) {
		let color = props.color || '#fff';
		return (
			<ContainerSpinner className={ !animation ? 'spinner' : animation} display={"inline"} margin={"0 8px"} jcontent={animation == 'pulse' ? true : false}>
				<Bounce className="bounce1" background={color} size={size} />
				<Bounce className="bounce2" background={color} size={size} />
				<Bounce className="bounce3" background={color} size={size} />
			</ContainerSpinner>
		);
	}
	return (
		<ContainerSpinner className={ !animation ? 'spinner' : animation} display="flex" jcontent={animation == 'pulse' ? true : false}>
			<Bounce className="bounce1" background={globalColorDefault} size={size} />
			<Bounce className="bounce2" background={globalColorDefault} size={size} />
			<Bounce className="bounce3" background={globalColorDefault} size={size} />
		</ContainerSpinner>
	)

}

export const Spinner = memo(_Spinner);
