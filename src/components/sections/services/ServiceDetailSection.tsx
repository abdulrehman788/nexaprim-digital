import { ServiceDetailArticle } from "@/components/sections/services/ServiceDetailArticle";
import type { ServiceDetail } from "@/types";

interface ServiceDetailSectionProps {
  service: ServiceDetail;
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
  return <ServiceDetailArticle service={service} />;
}
