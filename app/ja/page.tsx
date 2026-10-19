import type { Metadata } from "next";
import HomePage from "../HomePage";
import ja from "../i18n/ja";

export const metadata: Metadata = {
  title: ja.meta.title,
  description: ja.meta.description,
};

export default function Page() {
  return <HomePage locale="ja" dict={ja} />;
}
