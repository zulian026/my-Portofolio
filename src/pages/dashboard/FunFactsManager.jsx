import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FiTrash2, FiEdit2, FiX } from "react-icons/fi";

export default function FunFactsManager() {
  const [funfacts, setFunfacts] = useState([]);
  const [form, setForm] = useState({
    icon: "",
    text: "",
    rotate: 0,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from("funfacts")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setFunfacts(data);
  }

  async function handleSubmit() {
    if (editingId) {
      // UPDATE
      const { error } = await supabase
        .from("funfacts")
        .update(form)
        .eq("id", editingId);

      if (!error) {
        resetForm();
        loadData();
      }
    } else {
      // INSERT
      const { error } = await supabase.from("funfacts").insert(form);

      if (!error) {
        resetForm();
        loadData();
      }
    }
  }

  function resetForm() {
    setForm({ icon: "", text: "", rotate: 0 });
    setEditingId(null);
  }

  async function deleteFact(id) {
    const confirm = window.confirm("Yakin ingin menghapus fun fact ini?");
    if (!confirm) return;

    await supabase.from("funfacts").delete().eq("id", id);
    loadData();
  }

  function startEdit(fact) {
    setForm({
      icon: fact.icon,
      text: fact.text,
      rotate: fact.rotate,
    });
    setEditingId(fact.id);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Manage Fun Facts</h1>
        <p className="text-gray-600 text-sm">
          Kelola fun facts yang ditampilkan di homepage
        </p>
      </div>

      {/* Form Add/Edit */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {editingId ? "Edit Fun Fact" : "Tambah Fun Fact Baru"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon / Emoji
            </label>
            <input
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              placeholder="🌍"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition text-2xl text-center"
              maxLength={2}
            />
            <p className="text-xs text-gray-500 mt-1">
              Gunakan emoji favorit kamu
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text / Description
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="Suka eksplor tempat baru & traveling sederhana."
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotate (derajat)
            </label>
            <input
              type="number"
              value={form.rotate}
              onChange={(e) =>
                setForm({ ...form, rotate: Number(e.target.value) })
              }
              placeholder="contoh: -2, 3, 0"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Angka negatif untuk rotasi ke kiri, positif ke kanan
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
            >
              {editingId ? "Update Fun Fact" : "Tambah Fun Fact"}
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

      {/* List Fun Facts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Semua Fun Facts ({funfacts.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funfacts.map((f) => (
            <div
              key={f.id}
              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition group"
            >
              {/* Preview Card with Rotation */}
              <div
                className="bg-white p-4 rounded-xl shadow-sm mb-4 select-none"
                style={{ transform: `rotate(${f.rotate}deg)` }}
              >
                <div className="text-3xl mb-3 text-center">{f.icon}</div>
                <p className="text-sm text-gray-700 text-center">{f.text}</p>
              </div>

              {/* Info & Actions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">ID: {f.id}</span>
                  <span>Rotate: {f.rotate}°</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(f)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
                  >
                    <FiEdit2 className="text-base" /> Edit
                  </button>

                  <button
                    onClick={() => deleteFact(f.id)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition"
                  >
                    <FiTrash2 className="text-base" /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {funfacts.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">
              Belum ada fun facts. Tambahkan yang pertama! 💡
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
