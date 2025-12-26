import {
  BookOpen,
  DollarSign,
  Briefcase,
  Building2,
  TrendingUp,
  Globe,
  CheckCircle,
  GraduationCap,
  LucideProps,
} from "lucide-react";
import React from "react";

export const categoryIcons: { [key: string]: React.ComponentType<LucideProps> } = {
  course_explanation: BookOpen,
  prospects: TrendingUp,
  job_profiles: Briefcase,
  industries: Building2,
  salaries: DollarSign,
  top_companies: Building2,
  job_search_websites: Globe,
  immigration_relevance: CheckCircle,
  university_information: GraduationCap,
};

export const countries: string[] = [
  "Australia", "New Zealand", "UK", "Germany", "Canada", "UAE", "Ireland",
  "Singapore", "Netherlands", "France", "USA", "Deutschland", "Spain",
  "Italy", "Malta", "Finland", "Austria", "Sweden", "Norway", "Portugal",
  "Cyprus", "Lithuania", "Estonia", "Latvia", "Hungary", "Denmark",
  "Russia", "Kazakhstan", "Japan", "Korea", "Georgia", "Romania",
  "Caribbean Islands", "Phillipines",
];

export const languages: string[] = [
  "English", "Hindi", "Gujarati", "Marathi", "Punjabi", "Bengali",
  "Kannada", "Telugu", "Malayalam", "Tamil",
];

