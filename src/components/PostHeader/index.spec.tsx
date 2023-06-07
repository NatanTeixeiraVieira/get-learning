import { render, screen } from '@testing-library/react';
import { Providers } from 'app/providers';
import { dateFormatter } from 'utils/dateFormatter';

import PostInfoMock from 'components/PostInfo/mock';

import PostHeader from '.';

describe('<PostHeader />', () => {
  it('should render PostHeader correctly', () => {
    render(
      <Providers>
        <PostHeader
          title="Title"
          subtitle="Subtitle"
          imageSrc="https://res.cloudinary.com/dlizakp2a/image/upload/v1614696630/Frozen_sunset_on_the_lake_by_Manuel_Arslanyan_9f9cd8ea10.jpg"
          postInfo={PostInfoMock}
        />
      </Providers>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Imagem de ilustração do post' })
    ).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdlizakp2a%2Fimage%2Fupload%2Fv1614696630%2FFrozen_sunset_on_the_lake_by_Manuel_Arslanyan_9f9cd8ea10.jpg&w=3840&q=75'
    );
    expect(
      screen.getByText(dateFormatter(PostInfoMock.createdAt))
    ).toBeInTheDocument();
  });
});
