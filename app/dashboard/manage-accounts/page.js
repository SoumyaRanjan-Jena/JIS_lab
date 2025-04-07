'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ManageCasesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userType: 'Lawyer', name: '', email: '', phone: '', password: '' });

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/profile');
      const data = await res.json();

      if (data.userType !== 'registrar') {
        router.push('/');
      } else {
        setUser(data);
        fetchAccounts();
      }
    }

    async function fetchAccounts() {
      const res = await fetch('/api/accounts');
      const data = await res.json();
      setUsers(data);
    }

    fetchProfile();
  }, [router]);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/accounts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(user => user._id !== id));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setForm({ userType: 'Lawyer', name: '', email: '', phone: '', password: '' });
      alert('Account created successfully!');
    } else {
      alert('Error creating account');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Accounts</h1>

      <form onSubmit={handleCreate} className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Create New Account</h2>
        <div className="grid grid-cols-2 gap-4">
          <select
            name="userType"
            value={form.userType}
            onChange={(e) => setForm({ ...form, userType: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Lawyer">Lawyer</option>
            <option value="Judge">Judge</option>
          </select>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone No"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-2">Existing Users</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="text-center">
                <td className="border px-4 py-2">{u.name}</td>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.phone}</td>
                <td className="border px-4 py-2">{u.userType}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
