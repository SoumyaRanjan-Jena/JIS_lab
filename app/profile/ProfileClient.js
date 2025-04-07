'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut } from 'lucide-react';

export default function ProfileClient({ initialUser }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initialUser.name,
    phone: initialUser.phone,
    profilePic: initialUser.profilePic || ''
  });
  const [saving, setSaving] = useState(false);

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
      router.refresh();
    } else {
      console.error('Update failed');
    }
    setSaving(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/2 lg:w-1/3 bg-white border-r p-6 flex flex-col">
        <div className="flex flex-col items-center border-b pb-4 mb-4">
          {form.profilePic ? (
            <Image
              src={form.profilePic}
              alt="Avatar"
              width={120}
              height={120}
              className="rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center shadow-lg">
              <span className="text-gray-500 text-3xl">?</span>
            </div>
          )}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{initialUser.name}</h2>
          <p className="text-indigo-600 font-medium">
            {initialUser.userType.charAt(0).toUpperCase() + initialUser.userType.slice(1)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Profile Picture
            </label>
            <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded inline-block hover:bg-indigo-700">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {form.profilePic && (
              <div className="mt-2">
                <Image
                  src={form.profilePic}
                  alt="Profile Preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover shadow"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-all"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>

        {/* <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center space-x-2 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button> */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Resources & Guides</h1>
        <ul className="space-y-4 text-lg">
          <li>
            <a
              href="https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2024/07/20240716890312078.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Indian Constitution
            </a>
          </li>
          <li>
            <a
              href="https://doj.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Department of Justice
            </a>
          </li>
          <li>
            <a
              href="https://doj.gov.in/acts-and-rules/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Acts and Rules
            </a>
          </li>
          <li>
            <a
              href="https://www.indiacode.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              India Code (Digital Repository of Laws)
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}
