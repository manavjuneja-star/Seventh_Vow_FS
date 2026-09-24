import { notFound } from "next/navigation";

import { PortfolioEditForm } from "@/components/admin/PortfolioEditForm/PortfolioEditForm";
import { getPortfolioEntry } from "@/lib/portfolio";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioEdit({
  params,
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const entry = await getPortfolioEntry(params.slug);
  if (!entry) notFound();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>{entry.coupleNames}</h1>
      </div>
      <PortfolioEditForm entry={entry} />
    </>
  );
}
