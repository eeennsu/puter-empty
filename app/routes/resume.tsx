import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import ATS from '~/features/resume/ui/ATS';
import Details from '~/features/resume/ui/Details';
import Summary from '~/features/resume/ui/Summary';
import { usePuterStore } from '~/shared/store/puter';

export function meta() {
  return [
    { title: 'Resumind | Resume Review' },
    { name: 'description', content: 'A detailed overview of your resume' },
  ];
}

const ResumePage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setFeedback(data.feedback);
    };
    loadResume();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className='!pt-0'>
      <nav className='resume-nav'>
        <Link to='/' className='back-button'>
          <img src='/icons/back.svg' alt='logo' className='h-2.5 w-2.5' />
          <span className='text-sm font-semibold text-gray-800'>Back to Homepage</span>
        </Link>
      </nav>
      <div className='flex w-full flex-row max-lg:flex-col-reverse'>
        <section className="feedback-section sticky top-0 items-center justify-center bg-[url('/images/bg-small.svg')] bg-cover lg:h-[100vh]">
          {imageUrl && resumeUrl && (
            <div className='animate-in fade-in gradient-border h-[90%] w-fit duration-1000 max-2xl:h-fit max-sm:m-0'>
              <a href={resumeUrl} target='_blank'>
                <img
                  src={imageUrl}
                  className='h-full w-full rounded-2xl object-contain'
                  title='resume'
                />
              </a>
            </div>
          )}
        </section>
        <section className='feedback-section'>
          <h2 className='text-4xl font-bold !text-black'>Resume Review</h2>
          {feedback ? (
            <div className='animate-in fade-in flex flex-col gap-8 duration-1000'>
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src='/images/resume-scan-2.gif' className='w-full' />
          )}
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
