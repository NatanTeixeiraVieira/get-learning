import Link from 'next/link';

import { Category } from 'types/FindPostById';
import { dateFormatter } from 'utils/dateFormatter';

import { CategoryElement, Container } from './styles';

export type PostInfoProps = {
  createdAt: string;
  categories: Category[];
};

export default function PostInfo({ createdAt, categories }: PostInfoProps) {
  return (
    <Container>
      <p>
        Publicado em{' '}
        <time dateTime={createdAt.toString()}>{dateFormatter(createdAt)}</time>{' '}
        |{' '}
        {categories.map((category) => (
          <CategoryElement key={`post-info-${category.slug}`}>
            <Link
              href={{
                pathname: `/category/${category.slug}`,
                query: {
                  name: category.name,
                },
              }}
            >
              {category.name}
            </Link>
          </CategoryElement>
        ))}
      </p>
    </Container>
  );
}
