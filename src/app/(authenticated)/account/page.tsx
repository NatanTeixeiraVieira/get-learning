import { Metadata } from 'next';

import { getCurrentUser } from 'lib/session';
import getAuthorLoggedInfos from 'services/getAuthorLoggedInfos';

import { Container, Content } from 'components/CreateAndUpdatePost/styles';

import AccountInfos from 'components/AccountInfos';
import Heading from 'components/Heading';

export const metadata: Metadata = {
  title: 'Configurações da conta',
};

export default async function AccountConfig() {
  const session = await getCurrentUser();
  const authorLoggedInfos = await getAuthorLoggedInfos(session?.email);
  if (!authorLoggedInfos.ok) {
    throw new Error('Algo deu errado. Por favor tente novamente mais tarde.');
  }
  return (
    <Container>
      <Content>
        <Heading>Configurações da conta</Heading>
        <AccountInfos authorLoggedInfos={authorLoggedInfos.datas} />
      </Content>
    </Container>
  );
}
