import { getLogin } from 'services/auth';
import { getServerAuthentication } from 'utils/getServerAuthentication';

import { HeaderContainer, LoginAndRegister } from './styles';

import AsideNavbar from 'components/AsideNavbar';
import HeaderLink from 'components/HeaderLink';
import UserAccount from 'components/UserAccount';

export default async function Header() {
  const { token } = getServerAuthentication();
  const response = await getLogin(token);
  console.log('🚀 ~ Header ~ response:', response);

  return (
    <HeaderContainer>
      <AsideNavbar />
      {token && <UserAccount user={response.data} />}
      {!token && (
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
