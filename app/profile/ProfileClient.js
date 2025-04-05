'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function ProfileClient({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({
    name: initialUser.name || '',
    phone: initialUser.phone || '',
    profilePic: initialUser.profilePic || ''
  });

  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated)); // ✅ sync localStorage too
    } else {
      console.error('Update failed');
    }    
    setSaving(false);
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/sign-in');
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Left sidebar */}
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r p-6 flex flex-col">
        <div className="flex flex-col items-center">
          {form.profilePic ? (
            <Image
              src={form.profilePic}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-3xl">?</span>
            </div>
          )}
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-indigo-600 font-medium">{user.userType}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-1 w-full">
          <div>
            <label className="block text-gray-600 text-sm">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm">Phone</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setForm((prev) => ({ ...prev, profilePic: reader.result }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full border rounded px-3 py-2"
            />
            {form.profilePic && (
              <div className="mt-2">
                <Image
                  src={form.profilePic}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="mt-auto w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Resources & Guides</h1>
        <ul className="space-y-4">
          <li>
            <a
              href="https://legislative.gov.in/sites/default/files/A1950-01.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Constitution of India (PDF)
            </a>
          </li>
          <li>
            <a href="/guide" className="text-indigo-600 hover:underline">
              Website User Guide
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}
