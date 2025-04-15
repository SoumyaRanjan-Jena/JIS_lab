//app/dashboard/view-cases/page.js
'use client';
import React from "react";
import Card from "@/app/Components/Card";
import FilterComponent from "@/app/Components/FilterComponent";
import { useState } from 'react';

export default function ViewCasesPage() {
  const [cases, setCases] = useState([]);

  async function handleQuery(type, data) {
    const res = await fetch("/api/view-cases?type=" + type + "&data=" + data);
    const result = await res.json();
    setCases(result);
  }

  return (
    <div>
      <FilterComponent handleQuery={handleQuery} isEditAllowed={false}/>
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cases.map((caseItem, index) => (
            <Card
              key={index}
              CIN={caseItem.CIN}
              summary={caseItem.summary}
              isEditAllowed={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}