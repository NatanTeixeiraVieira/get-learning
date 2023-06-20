import Link from 'next/link';

import { Author, Category } from 'types/post';
import { dateFormatter } from 'utils/dateFormatter';

import { AuthorName, CategoryElement, Container } from './styles';

export type PostInfoProps = {
  createdAt: number;
  author: Author;
  categories: Category[];
};

export default function PostInfo({
  createdAt,
  author,
  categories,
}: PostInfoProps) {
  return (
    <Container>
      <p>
        Por{' '}
        <AuthorName>
          <Link href={`/author/${author.slug}`}>{author.name}</Link>{' '}
        </AuthorName>
        ─{' '}
        <time dateTime={createdAt.toString()}>{dateFormatter(createdAt)}</time>{' '}
        ─{' '}
        <span>
          {categories.map((category) => {
            return (
              <CategoryElement key={`post-info-${category.slug}`}>
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </CategoryElement>
            );
          })}
        </span>
      </p>
    </Container>
  );
}
