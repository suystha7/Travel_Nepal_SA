import InputFileWithPreview from '@/components/formField/InputFile';

const GalleryVideo = () => {
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md my-16">
      <InputFileWithPreview label="Gallery" name="gallery" required accept="image/*" multiple />
      <InputFileWithPreview label="Video" name="video" accept="video/*" />
    </div>
  );
};

export default GalleryVideo;
