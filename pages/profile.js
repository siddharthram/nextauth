import { getSession } from 'next-auth/react';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req});

  if (!session ) {
    return {
      redirect: {
        //notfound: 404
        destination: '/auth',
        permament: false
      }
    }
  }
  return {
    props: { session },
  }
}

export default ProfilePage;
