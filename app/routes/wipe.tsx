import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePuterStore } from '~/shared/store/puter';

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);
  const [isWiping, setIsWiping] = useState(false);

  const loadFiles = async () => {
    const files = (await fs.readDir('./')) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/wipe');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleDelete = async () => {
    setIsWiping(true);
    files.forEach(async file => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
    setIsWiping(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div>
      Authenticated as: {auth.user?.username}
      <div>Existing files:</div>
      <div className='flex flex-col gap-4'>
        {files.map(file => (
          <div key={file.id} className='flex flex-row gap-4'>
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className='cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={() => handleDelete()}
        >
          {isWiping ? 'Wiping...' : 'Wipe App Data'}
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
