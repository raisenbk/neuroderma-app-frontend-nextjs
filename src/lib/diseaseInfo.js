// src/lib/diseaseInfo.js
import { Bug, ShieldCheck, HelpCircle } from 'lucide-react';

export const diseaseDetails = {
  Chickenpox: {
    // Gunakan kunci dari file JSON
    name: "disease_chickenpox_name",
    slug: "chickenpox",
    Icon: Bug,
    defaultDescription: "disease_chickenpox_description",
    defaultSuggestions: [
      "disease_chickenpox_suggestion_1",
      "disease_chickenpox_suggestion_2",
      "disease_chickenpox_suggestion_3",
      "disease_chickenpox_suggestion_4",
    ],
    bgColor: "bg-red-50",
    textColor: "text-red-800",
    borderColor: "border-red-500",
    gaugeColor: "#ef4444"
  },
  Measles: {
    name: "disease_measles_name",
    slug: "measles",
    Icon: Bug,
    defaultDescription: "disease_measles_description",
    defaultSuggestions: [
        "disease_measles_suggestion_1",
        "disease_measles_suggestion_2",
        "disease_measles_suggestion_3",
    ],
    bgColor: "bg-purple-50",
    textColor: "text-purple-800",
    borderColor: "border-purple-500",
    gaugeColor: "#a855f7"
  },
  Monkeypox: {
    name: "disease_monkeypox_name",
    slug: "monkeypox",
    Icon: Bug,
    defaultDescription: "disease_monkeypox_description",
    defaultSuggestions: [
        "disease_monkeypox_suggestion_1",
        "disease_monkeypox_suggestion_2",
        "disease_monkeypox_suggestion_3",
        "disease_monkeypox_suggestion_4",
    ],
    bgColor: "bg-orange-50",
    textColor: "text-orange-800",
    borderColor: "border-orange-500",
    gaugeColor: "#f97316"
  },
  Normal: { 
    name: "disease_normal_name",
    slug: null,
    Icon: ShieldCheck,
    defaultDescription: "disease_normal_description",
    defaultSuggestions: [
      "disease_normal_suggestion_1",
      "disease_normal_suggestion_2",
      "disease_normal_suggestion_3",
    ],
    bgColor: "bg-green-50",
    textColor: "text-green-800",
    borderColor: "border-green-500",
    gaugeColor: "#22c55e"
  },
  unknown: {
    name: "disease_unknown_name",
    slug: null,
    Icon: HelpCircle,
    defaultDescription: "disease_unknown_description",
    defaultSuggestions: ["disease_unknown_suggestion_1"],
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-500",
    gaugeColor: "#6b7280"
  }
};