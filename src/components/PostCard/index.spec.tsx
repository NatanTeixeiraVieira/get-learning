import { screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';
import { textFormatter } from 'utils/textFormatter';

import PostCard from '.';

describe('<PostCard>', () => {
  it('should render post card correctly', () => {
    renderComponent(
      <PostCard
        title="Title"
        subtitle="Subtitle"
        imageSrc="https://avatars.githubusercontent.com/NatanTeixeiraVieira"
        id="my-post"
      />
    );

    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      `/post/my-post`
    );

    expect(screen.getByRole('img', { name: 'Title' })).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2FNatanTeixeiraVieira&w=640&q=75'
    );

    expect(screen.getByText('Title')).toBeInTheDocument();

    expect(screen.getByText(textFormatter('Subtitle'))).toBeInTheDocument();
  });
});
