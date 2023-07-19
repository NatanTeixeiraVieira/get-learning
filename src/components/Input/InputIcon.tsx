import { ElementType, HTMLAttributes } from 'react';

import { IconContainer } from './styles';

type InputIconEyeProps = {
  icon: ElementType;
} & HTMLAttributes<HTMLDivElement>;

export default function InputIcon({ icon: Icon, ...props }: InputIconEyeProps) {
  return <IconContainer onClick={props.onClick}>{<Icon />}</IconContainer>;
}
