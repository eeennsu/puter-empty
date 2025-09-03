import { cn } from '~/lib/utils';

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: 'good' | 'improve'; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        'to-light-white flex w-full flex-col gap-4 rounded-2xl bg-gradient-to-b p-8 shadow-md',
        score > 69 ? 'from-green-100' : score > 49 ? 'from-yellow-100' : 'from-red-100',
      )}
    >
      <div className='flex flex-row items-center gap-4'>
        <img
          src={
            score > 69
              ? '/icons/ats-good.svg'
              : score > 49
                ? '/icons/ats-warning.svg'
                : '/icons/ats-bad.svg'
          }
          alt='ATS'
          className='h-10 w-10'
        />
        <p className='text-2xl font-semibold'>ATS Score - {score}/100</p>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-xl font-medium'>
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className='text-lg text-gray-500'>
          Your resume was scanned like an employer would. Here's how it performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className='flex flex-row items-center gap-2' key={index}>
            <img
              src={suggestion.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'}
              alt='ATS'
              className='h-4 w-4'
            />
            <p className='text-lg text-gray-500'>{suggestion.tip}</p>
          </div>
        ))}
        <p className='text-lg text-gray-500'>
          Want a better score? Improve your resume by applying the suggestions listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
