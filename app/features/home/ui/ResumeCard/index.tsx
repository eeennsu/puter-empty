import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { usePuterStore } from '~/shared/store/puter';

import ScoreCircle from './ScoreCircle';

const ResumeCard = ({ resume }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
    setScore(resume.feedback.overallScore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume.imagePath]);

  return (
    <Link to={`/resume/${resume.id}`} className='resume-card animate-in fade-in duration-1000'>
      <div className='resume-card-header'>
        <div className='flex flex-col gap-2'>
          {resume.companyName && (
            <h2 className='font-bold break-words !text-black'>{resume.companyName}</h2>
          )}
          {resume.jobTitle && (
            <h3 className='text-lg break-words text-gray-500'>{resume.jobTitle}</h3>
          )}
          {!resume.companyName && !resume.jobTitle && (
            <h2 className='font-bold !text-black'>Resume</h2>
          )}
        </div>
        <div className='flex-shrink-0'>
          <ScoreCircle score={score} />
        </div>
      </div>
      {resumeUrl && (
        <div className='gradient-border animate-in fade-in duration-1000'>
          <div className='h-full w-full'>
            <img
              src={resumeUrl}
              alt='resume'
              className='h-[350px] w-full object-cover object-top max-sm:h-[200px]'
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
