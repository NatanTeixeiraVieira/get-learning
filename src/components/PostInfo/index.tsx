import Link from 'next/link';

import { Author } from 'types/author';
import { Category } from 'types/category';
import { dateFormatter } from 'utils/dateFormatter';

import { AuthorName, CategoryElement, Container } from './styles';

export type PostInfoProps = {
  createdAt: string;
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
          <Link href={`/author/${author.slug}`}>{author.displayName}</Link>{' '}
        </AuthorName>
        ─ <time dateTime={createdAt}>{dateFormatter(createdAt)}</time> ─{' '}
        <span>
          {categories.map((category) => {
            return (
              <CategoryElement key={`post-info-${category.id}`}>
                <Link href={`/category/${category.slug}`}>
                  {category.displayName}
                </Link>
              </CategoryElement>
            );
          })}
        </span>
      </p>
    </Container>
  );
}
