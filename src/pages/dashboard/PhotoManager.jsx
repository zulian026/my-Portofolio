import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";

export default function PhotoManager() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({ src: "", caption: "", rotate: 0 });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    const { data } = await supabase.from("photos").select("*").order("id");
    setPhotos(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addPhoto(e) {
    e.preventDefault();

    if (editingId) {
      // 🔥 UPDATE
      const { error } = await supabase
        .from("photos")
        .update(form)
        .eq("id", editingId);

      if (!error) {
        resetForm();
        load();
      }
    } else {
      // ➕ INSERT
      const { error } = await supabase.from("photos").insert(form);

      if (!error) {
        resetForm();
        load();
      }
    }
  }

  function resetForm() {
    setForm({ src: "", caption: "", rotate: 0 });
    setEditingId(null);
  }

  async function deletePhoto(id) {
    const confirm = window.confirm("Yakin ingin menghapus foto ini?");
    if (!confirm) return;

    await supabase.from("photos").delete().eq("id", id);
    load();
  }

  function startEdit(photo) {
    setForm({
      src: photo.src,
      caption: photo.caption,
      rotate: photo.rotate,
    });
    setEditingId(photo.id);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Manage Photos</h1>
        <p className="text-gray-600 text-sm">
          Kelola polaroid photos yang ditampilkan di homepage
        </p>
      </div>

      {/* Form Tambah / Edit */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? "Edit Photo" : "Tambah Photo Baru"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              value={form.src}
              onChange={(e) => setForm({ ...form, src: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption
            </label>
            <input
              type="text"
              placeholder="beach :3"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotate (derajat)
            </label>
            <input
              type="number"
              placeholder="contoh: -3, 2, 0"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              value={form.rotate}
              onChange={(e) =>
                setForm({ ...form, rotate: Number(e.target.value) })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Angka negatif untuk rotasi ke kiri, positif ke kanan
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={addPhoto}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
            >
              {editingId ? "Update Photo" : "Tambah Photo"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2"
              >
                <FiX /> Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List foto */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Semua Photos ({photos.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition group"
            >
              {/* Preview polaroid style */}
              <div
                className="bg-white p-2 rounded-lg shadow-sm mb-3"
                style={{ transform: `rotate(${p.rotate}deg)` }}
              >
                <img
                  src={p.src}
                  className="w-full h-40 object-cover rounded-md"
                  alt={p.caption}
                />
                <p className="text-center text-sm mt-2 italic text-gray-700">
                  {p.caption}
                </p>
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    ID: {p.id}
                  </span>
                  <span className="text-xs text-gray-500">
                    Rotate: {p.rotate}°
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FiEdit2 className="text-base" /> Edit
                  </button>

                  <button
                    onClick={() => deletePhoto(p.id)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    <FiTrash2 className="text-base" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">
              Belum ada photos. Tambahkan yang pertama! 📷
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
