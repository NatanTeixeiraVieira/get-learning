import Footer from 'components/Footer';
import GoToTop from 'components/GoToTop';
import Heading from 'components/Heading';
import PostContent from 'components/PostContent';
import mock from 'components/PostContent/mock';

export default function Home() {
  return (
    <div>
      <Heading>Hello, world</Heading>
      <GoToTop />
      <PostContent content={mock} />
      <Footer />
    </div>
  );
}
