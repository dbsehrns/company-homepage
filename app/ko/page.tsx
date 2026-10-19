import type { Metadata } from "next";
import HomePage from "../HomePage";
import ko from "../i18n/ko";

export const metadata: Metadata = {
  title: ko.meta.title,
  description: ko.meta.description,
};

export default function Page() {
  return <HomePage locale="ko" dict={ko} />;
}
