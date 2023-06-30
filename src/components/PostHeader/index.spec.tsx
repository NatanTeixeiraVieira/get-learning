import { screen } from '@testing-library/react';
import postMock from 'mock/postMock';
import renderComponent from 'tests/renderComponent';
import { dateFormatter } from 'utils/dateFormatter';
import { textFormatter } from 'utils/textFormatter';

import PostHeader from '.';

describe('<PostHeader />', () => {
  it('should render PostHeader correctly', () => {
    renderComponent(
      <PostHeader
        title={postMock.title}
        subtitle={textFormatter(postMock.subtitle)}
        imageSrc={postMock.author.avatar.url}
        createdAt={postMock.createdAt}
        author={postMock.author}
        categories={postMock.categories}
      />
    );
    expect(
      screen.getByRole('heading', { name: postMock.title })
    ).toBeInTheDocument();
    expect(
      screen.getByText(textFormatter(postMock.subtitle))
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Imagem de ilustração do post' })
    ).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2FNatanTeixeiraVieira&w=3840&q=75'
    );
    expect(
      screen.getByText(dateFormatter(postMock.createdAt))
    ).toBeInTheDocument();
  });
});
