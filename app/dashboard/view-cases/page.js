'use client';
import React from "react";
import Card from "@/components/Card";
import FilterComponent from "@/components/FilterComponent";


export default function ViewCasesPage() {

  return (
    <div>
      <FilterComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Repeat cards as needed */}
          <Card title="Card 1" body="Card content goes here..."></Card>
          <Card title="Card 2" body="Card content goes here..."></Card>
          <Card title="Card 3" body="Card content goes here..."></Card>
          <Card title="Card 4" body="Card content goes here..."></Card>
          <Card title="Card 5" body="Card content goes here..."></Card>
          <Card title="Card 6" body="Card content goes here..."></Card>
          <Card title="Card 7" body="Card content goes here..."></Card>
          <Card title="Card 8" body="Card content goes here..."></Card>
          
          {/* Add more cards as needed */}
      </div>
    </div>
  );
}