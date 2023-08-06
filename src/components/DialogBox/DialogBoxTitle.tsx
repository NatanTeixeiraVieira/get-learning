import Heading from 'components/Heading';

type DialogBoxTitleProps = {
  text: string;
};

export default function DialogBoxTitle({ text }: DialogBoxTitleProps) {
  return (
    <Heading as="h1" size="medium">
      {text}
    </Heading>
  );
}
