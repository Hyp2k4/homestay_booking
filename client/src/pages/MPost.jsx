import { useState, useEffect, useRef } from 'react';

function UploadMultipleImages() {
  const [images, setImages] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [existingImages, setExistingImages] = useState([]);

  const fileInputRefs = useRef({}); // Dùng để mở file input tương ứng khi đổi ảnh

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!images.length || !roomId) {
      alert('Vui lòng chọn ảnh và nhập room_id');
      return;
    }

    const formData = new FormData();
    for (const img of images) {
      formData.append('images', img);
    }
    formData.append('room_id', roomId);

    try {
      const res = await fetch('https://homestay-booking-backend.vercel.app/api/upload-multiple', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      alert('Upload thành công!');
      setImages([]);
      fetchExistingImages(); // Load lại ảnh đã upload
    } catch (err) {
      console.error(err);
      alert('Lỗi khi upload!');
    }
  };

  // Gọi API để lấy preview_images của room
  const fetchExistingImages = async () => {
    if (!roomId) return;
    try {
      const res = await fetch(`https://homestay-booking-backend.vercel.app/api/rooms/${roomId}`);
      const data = await res.json();

      if (typeof data.preview_images === 'string') {
        data.preview_images = JSON.parse(data.preview_images);
      }
      setExistingImages(data.preview_images || []);
    } catch (err) {
      console.error(err);
      setExistingImages([]);
    }
  };

  // Tự động fetch ảnh khi nhập roomId
  useEffect(() => {
    if (roomId) {
      fetchExistingImages();
    }
  }, [roomId]);

  // Đổi 1 ảnh cụ thể trong danh sách preview
  const handleReplaceImage = (index) => {
    fileInputRefs.current[index]?.click();
  };

  // Khi chọn file thay thế ảnh
  const handleFileChangeForReplace = async (e, index) => {
    const file = e.target.files[0];
    if (!file || !roomId) return;

    const formData = new FormData();
    formData.append('room_id', roomId);
    formData.append('replaceIndex', index);
    formData.append('image', file);

    try {
      const res = await fetch(`https://homestay-booking-backend.vercel.app/api/replace-preview-image`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      alert('Đổi ảnh thành công');
      fetchExistingImages();
    } catch (err) {
      console.error(err);
      alert('Lỗi khi đổi ảnh');
    }
  };

  return (
    <div className="space-y-6 pt-50 max-w-xl mx-auto">
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Upload Multiple Images
        </button>
      </form>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ảnh đã thêm cho phòng:</h3>
          <div className="grid grid-cols-3 gap-4">
            {existingImages.map((img, index) => (
              <div key={index} className="text-center space-y-2">
                <img
                  src={img}
                  alt={`Preview ${index + 1}`}
                  className="w-full max-h-32 object-contain rounded shadow"
                />
                <button
                  type="button"
                  onClick={() => handleReplaceImage(index)}
                  className="text-blue-600 text-sm underline"
                >
                  Đổi ảnh
                </button>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  onChange={(e) => handleFileChangeForReplace(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadMultipleImages;
