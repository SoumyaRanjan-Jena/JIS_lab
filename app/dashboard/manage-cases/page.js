'use client';
import React from "react";
import Card from "@/app/Components/Card";
import FilterComponent from "@/app/Components/FilterComponent";
import { useState } from 'react';
import viewCase from "@/models/viewCase";

export default function ManageCasesPage() {
  const [cases, setCases] = useState([]);

  async function handleQuery(type, data) {
    const result = await viewCase(type, data);
    setCases(result);
  }


  return (
    <div>
      <FilterComponent handleQuery={handleQuery} isEditAllowed={true}/>
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cases.map((caseItem, index) => (
            <Card
              key={index}
              CIN={caseItem.CIN}
              summary={caseItem.summary}
              isEditAllowed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}