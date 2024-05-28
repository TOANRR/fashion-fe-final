export default function getCroppedImg(imageSrc, pixelCrop, zoom) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Tính toán kích thước mới dựa trên tỷ lệ aspect ratio 3:4
            const aspectRatio = 3 / 4;
            const scaledWidth = image.width / zoom;
            const scaledHeight = scaledWidth * aspectRatio;
            const scaledX = pixelCrop.x / zoom;
            const scaledY = pixelCrop.y / zoom;

            canvas.width = scaledWidth;
            canvas.height = scaledHeight;

            ctx.drawImage(
                image,
                scaledX,
                scaledY,
                scaledWidth,
                scaledHeight,
                0,
                0,
                scaledWidth,
                scaledHeight
            );

            canvas.toBlob((blob) => {
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg');
        };
        image.onerror = function (error) {
            reject(error);
        };
    });
}
