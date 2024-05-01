import { getServerAuthentication } from 'utils/getServerAuthentication';

import { HeaderContainer, LoginAndRegister } from './styles';

import AsideNavbar from 'components/AsideNavbar';
import HeaderLink from 'components/HeaderLink';
import UserAccount from 'components/UserAccount';

export default function Header() {
  const user = getServerAuthentication();

  return (
    <HeaderContainer>
      <AsideNavbar />
      {user.token && <UserAccount />}
      {!user.token && (
        <nav>
          <LoginAndRegister>
            <HeaderLink href="/login">Entrar</HeaderLink>
            <HeaderLink href="/register">Cadastrar</HeaderLink>
          </LoginAndRegister>
        </nav>
      )}
    </HeaderContainer>
  );
}
