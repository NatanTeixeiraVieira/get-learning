import { Message } from './styles';

type DialogBoxMessageProps = {
  text: string;
};

export default function DialogBoxMessage({ text }: DialogBoxMessageProps) {
  return <Message>{text}</Message>;
}
