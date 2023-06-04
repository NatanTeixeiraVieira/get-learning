import { Wrapper } from './styles';

export type PostContentProps = {
  content: string;
};

export default function PostContent({ content }: PostContentProps) {
  return <Wrapper dangerouslySetInnerHTML={{ __html: content }} />;
}
