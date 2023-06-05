import Footer from 'components/Footer';
import GoToTop from 'components/GoToTop';
import Heading from 'components/Heading';
import PostContent from 'components/PostContent';
import mock from 'components/PostContent/mock';
import PostOwner from 'components/PostOwner';

export default function Home() {
  return (
    <>
      <PostOwner
        name="Natãn Teixeira Vieira"
        avatarSrc="https://avatars.githubusercontent.com/NatanTeixeiraVieira"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maxime, facere molestiae fugit reprehenderit exercitationem maiores expedita dolor, sint accusamus aliquam esse suscipit temporibus corporis, molestias dolore quibusdam excepturi accusantium?"
      />
      <Heading>Hello, world</Heading>
      <GoToTop />
      <PostContent content={mock} />
      <Footer />
    </>
  );
}
