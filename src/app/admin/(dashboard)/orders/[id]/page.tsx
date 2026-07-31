import { OrderDetailView } from "@/components/admin/ops/OrderDetailView";

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  return <OrderDetailView id={params.id} />;
}
