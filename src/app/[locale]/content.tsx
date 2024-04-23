'use client';

import useAuth from '@/auth/useAuth';
import { useRouter } from '@/navigation';
import { Button, Stack, Typography } from '@mui/material';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';

const Content = () => {
  const { user } = useAuth();
  const { replace } = useRouter();
  // restore path after logout
  const [path, savePath] = useLocalStorage<string>('currentPageBeforeLogout');
  useEffect(() => {
    path && replace(path);
    savePath('');
  }, []);

  return (
    <>
      <Typography>The email: {user?.email}</Typography>
      <Stack direction={'column'} spacing={2}>
        <Button variant="contained" href="/demo/sentiment">
          Go to sentiment
        </Button>
        <Button variant="contained" href="/demo/image-search">
          Go to image-search
        </Button>
        <Button variant="contained" href="/demo/predictive-maintenance">
          Go to predictive-maintenance
        </Button>
      </Stack>
    </>
  );
};

export default Content;
