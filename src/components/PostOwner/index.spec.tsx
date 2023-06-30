import { screen } from '@testing-library/react';
import renderComponent from 'tests/renderComponent';

import PostOwner from '.';

describe('<PostOwner />', () => {
  it('should render PostOwner correcly', () => {
    renderComponent(
      <PostOwner
        name="Natãn Teixeira Vieira"
        avatarSrc="https://avatars.githubusercontent.com/NatanTeixeiraVieira"
        description="My description"
      />
    );
    expect(
      screen.getByRole('img', { name: 'Avatar do proprietário do blog' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Avatar do proprietário do blog' })
    ).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2FNatanTeixeiraVieira&w=384&q=75'
    );
    expect(screen.getByText('Natãn Teixeira Vieira')).toBeInTheDocument();
    expect(screen.getByText('My description')).toBeInTheDocument();
  });
  it('should not render description when showDescription prop was pessed false', () => {
    renderComponent(
      <PostOwner
        name="Natãn Teixeira Vieira"
        avatarSrc="https://avatars.githubusercontent.com/NatanTeixeiraVieira"
        description="My description"
        showDescription={false}
      />
    );
    expect(
      screen.getByRole('img', { name: 'Avatar do proprietário do blog' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Avatar do proprietário do blog' })
    ).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2FNatanTeixeiraVieira&w=384&q=75'
    );
    expect(screen.getByText('Natãn Teixeira Vieira')).toBeInTheDocument();
    expect(screen.queryByText('My description')).not.toBeInTheDocument();
  });
});
