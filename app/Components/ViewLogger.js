//app/Components/ViewLogger.js
'use client';

import { useEffect } from 'react';

export default function ViewLogger({ CIN }) {
  useEffect(() => {
    async function logBilling() {
      try {
        const res = await fetch('/api/billing/log-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ caseId: CIN }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error('Billing log failed:', data.error);
        } else {
          console.log('Billing logged:', data);
        }
      } catch (err) {
        console.error('Failed to log billing:', err);
      }
    }

    logBilling();
  }, [CIN]);

  return null; // No UI rendered
}
