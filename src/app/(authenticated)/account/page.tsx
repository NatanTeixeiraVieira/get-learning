import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getLogin } from 'services/auth';
import { getServerAuthentication } from 'utils/getServerAuthentication';

import { Container, Content } from 'components/CreateAndUpdatePost/styles';

import AccountInfos from 'components/AccountInfos';
import Heading from 'components/Heading';

export const metadata: Metadata = {
  title: 'Configurações da conta',
};

export default async function AccountConfig() {
  const { token } = getServerAuthentication();

  const user = await getLogin(token);

  if (!user.data) {
    redirect('/login');
  }

  return (
    <Container>
      <Content>
        <Heading>Configurações da conta</Heading>
        <AccountInfos user={user.data} />
      </Content>
    </Container>
  );
}
