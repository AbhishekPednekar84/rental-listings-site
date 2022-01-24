import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { cameraIcon, bannedIcon, trashIcon, errorIcon } from "@/utils/icons";

const ImageUploader = ({ files, setFiles, imgList }) => {
  var newFiles;

  newFiles = [...files];

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const images = newFiles.map((file, index) => {
    return (
      <div key={index}>
        <div>
          <img src={file.preview} width="90px" alt="image" />
          <p
            onClick={() => {
              newFiles.splice(newFiles.indexOf(file), 1);
              setFiles(newFiles);
            }}
            className="flex items-center text-xs pt-2 cursor-pointer text-brand-gray"
          >
            {trashIcon}
            Remove
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="max-w-[400px] mt-8">
      <h5 className="mb-5 font-medium">
        Upload images (
        {imgList.length > 0
          ? 7 - imgList.length - newFiles.length
          : 7 - newFiles.length}{" "}
        remaining):
      </h5>
      <Dropzone
        accept="image/jpg, image/jpeg, image/png, image/webp"
        onDrop={onDrop}
        maxFiles={newFiles.length < 7 ? 7 - parseInt(newFiles.length) : 7}
      >
        {({ getRootProps, getInputProps, isDragReject }) => (
          <section>
            {newFiles.length < 7 ? (
              <div className="w-full">
                {isDragReject && (
                  <div className="text-xs text-rose-600 p-1 mb-2 flex items-center">
                    {errorIcon}&nbsp;Accepted image formats - jpeg, webp and png
                  </div>
                )}
                <div
                  {...getRootProps()}
                  className="flex flex-col items-center justify-center py-8 bg-stone-200 border-dashed border-teal-600 border-2 cursor-pointer focus:outline-none"
                >
                  <input {...getInputProps()} />
                  {cameraIcon}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-stone-200 border-dashed border-rose-600 error-border border-2 cursor-not-allowed focus:outline-none">
                {bannedIcon}
                {files.length === 7 ? (
                  <div className="text-xs error-text pt-2 text-center">
                    <p className="py-2">You have added 7 photos.</p>
                    <p>You can delete existing photos to upload new one's.</p>
                  </div>
                ) : (
                  <p className="text-xs error-text pt-2">
                    {/* Sorry!{" "}
                      {!props.uploadedImages
                        ? "7"
                        : 7 - parseInt(props.uploadedImages)}{" "}
                      is the limit. */}
                    You have added 7 photos.
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-4 gap-3 mt-4 pt-2">
              {images.slice(0, 7)}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
