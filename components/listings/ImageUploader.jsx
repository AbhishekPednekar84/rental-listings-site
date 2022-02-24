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
            className="text-brand-gray flex cursor-pointer items-center pt-2 text-xs"
          >
            {trashIcon}
            Remove
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="max-w-[400px]">
      <h5 className="mb-5 text-xs font-medium text-teal-600 ">
        Upload images (
        <span className="font-semibold">
          {imgList.length > 0
            ? 7 - imgList.length - newFiles.length
            : 7 - newFiles.length}{" "}
          remaining
        </span>
        ):
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
                  <div className="mb-2 flex items-center p-1 text-xs text-rose-600">
                    {errorIcon}&nbsp;Accepted image formats - jpeg, webp and png
                  </div>
                )}
                <div
                  {...getRootProps()}
                  className="flex cursor-pointer flex-col items-center justify-center border-2  border-teal-900 bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 py-8 focus:outline-none"
                >
                  <input {...getInputProps()} />
                  {cameraIcon}
                </div>
              </div>
            ) : (
              <div className="error-border flex cursor-not-allowed flex-col items-center justify-center border-2 border-dashed border-rose-600 bg-stone-200 p-8 focus:outline-none">
                {bannedIcon}
                {files.length === 7 ? (
                  <div className="error-text pt-2 text-center text-xs">
                    <p className="py-2">You have added 7 photos.</p>
                    <p>You can delete existing photos to upload new one's.</p>
                  </div>
                ) : (
                  <p className="error-text pt-2 text-xs">
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

            <div className="mt-4 grid grid-cols-4 gap-3 pt-2">
              {images.slice(0, 7)}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUploader;
