/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDetails: string;
  features: string[];
  metricLabel: string;
  metricValue: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  specialty: string;
  skills: { name: string; percentage: number }[];
}

export interface AchievementItem {
  value: string;
  label: string;
  subtext: string;
}

export interface ClientLogo {
  name: string;
  accentColor: string;
  textLogo: string;
  tagline: string;
}

export interface ResultMetric {
  value: string;
  label: string;
  sub: string;
}

export interface CaseStudy {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  tagline: string;
  approach: string[];
  results: ResultMetric[];
  accentColor: string;
  featuresColor: string;
  industry: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}
