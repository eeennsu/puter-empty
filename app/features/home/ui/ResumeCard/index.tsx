import type { FC } from 'react';
import { Link } from 'react-router';

import ScoreCircle from './ScoreCircle';

// import { usePuterStore } from '~/lib/puter';

interface IProps {
  resume: Resume;
}

const ResumeCard: FC<IProps> = ({ resume }) => {
  const { feedback, id, jobTitle, companyName, imagePath } = resume;
  // const { fs } = usePuterStore();
  // const [resumeUrl, setResumeUrl] = useState('');

  // useEffect(() => {
  //   const loadResume = async () => {
  //     const blob = await fs.read(imagePath);
  //     if (!blob) return;
  //     const url = URL.createObjectURL(blob);
  //     setResumeUrl(url);
  //   };

  //   loadResume();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000'>
      <div className='resume-card-header'>
        <div className='flex flex-col gap-2'>
          {companyName && <h2 className='font-bold break-words !text-black'>{companyName}</h2>}
          {jobTitle && <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>}
          {!companyName && !jobTitle && <h2 className='font-bold !text-black'>Resume</h2>}
        </div>
        <div className='flex-shrink-0'>
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {imagePath && (
        <div className='gradient-border animate-in fade-in duration-1000'>
          <div className='h-full w-full'>
            <img
              src={imagePath}
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
