import { useState } from 'react';

function UploadImage() {
  const [image, setImage] = useState(null);
  const [roomId, setRoomId] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image || !roomId) {
      alert("Vui lòng chọn ảnh và nhập room_id");
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // key 'image' khớp với upload.single('image')
    formData.append('room_id', roomId);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log('Upload success:', data);
      alert(`Đã upload ảnh: ${data.imageUrl}`);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload thất bại!');
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 pt-50">
      <input
        type="text"
        placeholder="Nhập room_id"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
}

export default UploadImage;
