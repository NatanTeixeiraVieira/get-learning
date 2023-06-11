import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Providers } from 'app/providers';

import light from 'styles/themes/light';

import Header from '.';

describe('<Header>', () => {
  it('should render header correctly on desktop', () => {
    render(
      <Providers>
        <Header />
      </Providers>
    );

    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('should render header correctly on mobile', () => {
    render(
      <Providers>
        <Header />
      </Providers>
    );

    expect(screen.getByRole('menubar')).toHaveStyleRule('left', '-300px', {
      media: light.media.tablet.substring(7),
    });

    expect(screen.getByTestId('outOfMenu')).toHaveStyle({
      display: 'none',
    });
  });

  it('should show menu when menu burger was pressed and close when any space out of menu was pressed on mobile', async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <Header />
      </Providers>
    );

    const outOfMenu = screen.getByTestId('outOfMenu');
    const HeaderContent = screen.getByRole('menubar');

    await user.click(screen.getByTestId('menuBurger'));

    expect(HeaderContent).toHaveStyleRule('left', '0px', {
      media: light.media.tablet.substring(7),
    });

    expect(outOfMenu).toHaveStyle({
      display: 'block',
    });

    await user.click(outOfMenu);

    expect(HeaderContent).toHaveStyleRule('left', '-300px', {
      media: light.media.tablet.substring(7),
    });

    expect(outOfMenu).toHaveStyle({
      display: 'none',
    });
  });
});
