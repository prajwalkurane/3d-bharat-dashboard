import { redirect } from 'next/navigation';

export default function DealAliasPage({ params }) {
  redirect(`/deals/${params.id}`);
}
