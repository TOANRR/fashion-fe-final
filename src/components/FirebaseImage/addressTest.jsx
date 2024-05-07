import React, { useState } from 'react';

const CropImage = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropStart, setCropStart] = useState({ x: 0, y: 0 });
  const [isCropping, setIsCropping] = useState(false);
  const [cropSize, setCropSize] = useState({ width: 0, height: 0 });

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setCropStart({ x: offsetX, y: offsetY });
    setIsCropping(true);
  };

  const onMouseMove = (e) => {
    if (!isCropping) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setCropSize({ width: offsetX - cropStart.x, height: offsetY - cropStart.y });
  };

  const onMouseUp = () => {
    setIsCropping(false);
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = cropSize.width;
    croppedCanvas.height = cropSize.height;
    const ctx = croppedCanvas.getContext('2d');
    const imageElement = document.getElementById('image-preview');
    ctx.drawImage(
      imageElement,
      cropStart.x, cropStart.y,
      cropSize.width, cropSize.height,
      0, 0,
      cropSize.width, cropSize.height
    );
    setCroppedImage(croppedCanvas.toDataURL());
  };

  return (
    <div>
      <input type="file" onChange={onSelectFile} />
      {image && (
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>
          <img
            id="image-preview"
            src={image}
            alt="Preview"
            style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          />
          {isCropping && (
            <div
              style={{
                position: 'absolute',
                border: '1px dashed red',
                left: cropStart.x,
                top: cropStart.y,
                width: cropSize.width,
                height: cropSize.height,
              }}
            ></div>
          )}
        </div>
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
};

export default CropImage;
