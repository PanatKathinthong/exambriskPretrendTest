import { Button, FormHelperText, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import useAuth from '@/auth/useAuth';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { ImageSearchResponse, postImageSearch } from '@/services/demo';

interface UploadImageProps {
  onImageUpload: (image: string | null, result: ImageSearchResponse | null) => void;
}
const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const { isAuthenticated, redirectToLogin } = useAuth();
  const imageFile = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const imageSizeLimit = 25 * 1024 * 1024; // 25MB in bytes

  const imageSchema = z
    .object({
      size: z.number().max(imageSizeLimit, '*png,jpg ไม่เกิน 25MB'),
    })
    .partial();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files && event.target.files[0];

    if (fileUploaded) {
      // image size validation
      try {
        imageSchema.parse({ size: fileUploaded.size });
        setErrorMessage(null);
        console.log('upload file success.');
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage(error.errors[0].message);
          onImageUpload(null, null);
          console.error(error.errors[0].message);
          return;
        }
      }
      // fetching
      try {
        console.log('trying to fetch....');
        const formData = new FormData();
        formData.append('file', fileUploaded);

        const { data } = await postImageSearch(formData);
        const imageUrl = URL.createObjectURL(fileUploaded);
        onImageUpload(imageUrl, data);
      } catch (error) {
        alert('failed to fetch');
        console.log(error);
      }

      event.target.value = ''; // reset input
    }
  };

  const onUploadFile = () => {
    if (!isAuthenticated) {
      redirectToLogin();
    }
    imageFile.current?.click();
    console.log('uploading files');
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '12px' }}>
        Upload Image to test
      </Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={imageFile}
        style={{ display: 'none' }}
      />
      <Button
        variant="contained"
        size="medium"
        color="inherit"
        endIcon={<FileUploadIcon />}
        fullWidth
        onClick={onUploadFile}
        sx={{ borderRadius: 100 }}
      >
        select file
      </Button>
      {errorMessage && (
        <FormHelperText error sx={{ marginTop: '8px' }}>
          {errorMessage}
        </FormHelperText>
      )}
    </>
  );
};

export default UploadImage;
