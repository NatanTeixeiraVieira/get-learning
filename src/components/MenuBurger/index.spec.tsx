import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from 'tests/renderComponent';

import light from 'styles/themes/light';

import MenuBurger from '.';

describe('<MenuBurger>', () => {
  const onclickMock = jest.fn();

  it('should has display block when device is mobile', () => {
    renderComponent(<MenuBurger onClick={onclickMock} showMenu={false} />);

    expect(screen.getByTestId('menuBurger')).toHaveStyleRule(
      'display',
      'block',
      {
        media: light.media.tablet.substring(7),
      }
    );
  });

  it('should call onclick function when it was clicked', async () => {
    const user = userEvent.setup();

    renderComponent(<MenuBurger onClick={onclickMock} showMenu={false} />);

    await user.click(screen.getByTestId('menuBurger'));

    expect(onclickMock).toHaveBeenCalledTimes(1);
  });

  it('should has position relative when showMenu is false', () => {
    renderComponent(<MenuBurger onClick={onclickMock} showMenu={false} />);

    expect(screen.getByTestId('menuBurger')).toHaveStyle({
      position: 'relative',
    });
  });

  it('should animate and has position fixed when showMenu is true', () => {
    renderComponent(<MenuBurger onClick={onclickMock} showMenu={true} />);

    const container = screen.getByTestId('menuBurger');
    const spans = container.querySelectorAll('span');

    expect(container).toHaveStyle({
      position: 'fixed',
    });

    expect(spans[0]).toHaveStyle({
      transformOrigin: '0% 0%',
      transform: 'rotate(45deg)',
    });

    expect(spans[1]).toHaveStyle({
      opacity: '0',
    });

    expect(spans[2]).toHaveStyle({
      transformOrigin: '0% 100%',
      transform: 'rotate(-45deg)',
    });
  });
});
