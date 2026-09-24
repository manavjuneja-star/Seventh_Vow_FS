import { notFound } from "next/navigation";

import { DestinationEditForm } from "@/components/admin/DestinationEditForm/DestinationEditForm";
import { getDestination } from "@/lib/destinations";

import styles from "@/app/admin/admin.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDestinationEdit({
  params,
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const destination = await getDestination(params.slug);
  if (!destination) notFound();

  return (
    <>
      <div className={styles.pageHead}>
        <h1 className={styles.h1}>{destination.name}</h1>
      </div>
      <DestinationEditForm destination={destination} />
    </>
  );
}
