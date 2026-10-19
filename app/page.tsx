import type { Metadata } from "next";
import HomePage from "./HomePage";
import en from "./i18n/en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function Page() {
  return <HomePage locale="en" dict={en} />;
}
