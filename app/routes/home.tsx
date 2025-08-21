import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { resumes } from '~/entities/home/consts';
import { usePuterStore } from '~/features/home/lib/puter';
import Navbar from '~/features/home/ui/Navbar';
import ResumeCard from '~/features/home/ui/ResumeCard';

import type { Route } from './+types/home';

// eslint-disable-next-line
export const meta = ({}: Route.MetaArgs): Route.MetaDescriptors => {
  return [
    { title: 'Resume Analyzer' },
    { name: 'Resume Analyzer ', content: 'Welcome to Resume Analyzer' },
  ];
};
export default function Home() {
  const navigate = useNavigate();
  const { auth } = usePuterStore();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  return (
    <main>
      <Navbar />
      <section className='main-section'>
        <div className='page-heading'>
          <h1>Welcome to Resume Analyzer</h1>
          <h2>Review your resumes and get a score. By AI Powered 🚀</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className='resumes-section'>
          {resumes.map(resume => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </main>
  );
}
