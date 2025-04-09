'use client';
import { useEffect, useState } from 'react';

export default function BillingPage() {
  const [data, setData] = useState({ total: 0, records: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBilling() {
      try {
        const res = await fetch('/api/billing/total');
        const json = await res.json();
        console.log('Billing JSON:', json);

        if (res.ok && json?.records && Array.isArray(json.records)) {
          setData(json);
        } else {
          setError('Invalid billing data received');
          console.error('Invalid billing data:', json);
        }
      } catch (err) {
        setError('Failed to load billing info');
        console.error('Error loading billing info:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBilling();
  }, []);

  async function handlePayment(record) {
    if (!window.confirm("Confirm Payment")) return;

    try {
      // Call your API to delete the record.
      const res = await fetch(`/api/billing/${record.caseId}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        console.error('Failed to delete record from the database');
        return;
      }

      // Update the local state by filtering out the paid record.
      const updatedRecords = data.records.filter(r => r.caseId !== record.caseId);
      const updatedTotal = updatedRecords.reduce((sum, r) => sum + r.charge, 0);

      setData({
        total: updatedTotal,
        records: updatedRecords,
      });
    } catch (err) {
      console.error('Error processing payment:', err);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Your Billing</h1>
      <p className="mb-4 text-lg">Total Due: ₹{data.total}</p>

      <div className="bg-white shadow rounded-md overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Case ID</th>
              <th className="px-4 py-2">Viewed At</th>
              <th className="px-4 py-2">Charge</th>
              <th className="px-4 py-2">Payment</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data.records) && data.records.length > 0 ? (
              data.records.map((record, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{record.caseId}</td>
                  <td className="px-4 py-2">{new Date(record.viewedAt).toLocaleString()}</td>
                  <td className="px-4 py-2">₹{record.charge}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handlePayment(record)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No billing records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
