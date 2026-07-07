"use client";

import { ExternalLink } from "lucide-react";

import {
  AdminButton,
  AdminFieldHint,
  AdminInput,
  AdminLabel,
  AdminSelect,
} from "@/components/admin/ui/AdminFields";
import { AdminCard, AdminCardHeader } from "@/components/admin/ui/AdminCard";
import { ContentStatusBadge } from "@/components/admin/ContentStatusBadge";
import type { ContentStatus } from "@/lib/content/types";

interface StatusOption {
  value: ContentStatus;
  label: string;
}

interface AdminPublishPanelProps {
  status: ContentStatus;
  onStatusChange: (status: ContentStatus) => void;
  publishAt: string;
  onPublishAtChange: (value: string) => void;
  statusOptions: readonly StatusOption[];
  saving: boolean;
  isEdit: boolean;
  saveLabel?: string;
  previewUrl?: string;
  onCancel: () => void;
}

export function AdminPublishPanel({
  status,
  onStatusChange,
  publishAt,
  onPublishAtChange,
  statusOptions,
  saving,
  isEdit,
  saveLabel,
  previewUrl,
  onCancel,
}: AdminPublishPanelProps) {
  return (
    <div className="space-y-4 lg:sticky lg:top-20">
      <AdminCard>
        <AdminCardHeader title="Publish" description="Visibility and scheduling" />
        <div className="space-y-4 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5">
            <span className="text-xs font-medium text-zinc-500">Current status</span>
            <ContentStatusBadge status={status} publishAt={publishAt || null} />
          </div>

          <div>
            <AdminLabel>Status</AdminLabel>
            <AdminSelect
              value={status}
              onChange={(e) => onStatusChange(e.target.value as ContentStatus)}
              className="mt-1.5"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </AdminSelect>
          </div>

          <div>
            <AdminLabel>Publish date</AdminLabel>
            <AdminInput
              type="datetime-local"
              value={publishAt}
              onChange={(e) => onPublishAtChange(e.target.value)}
              className="mt-1.5"
            />
            <AdminFieldHint>
              Optional. Used for scheduled posts or backdating published content.
            </AdminFieldHint>
          </div>

          {previewUrl ? (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View on site
            </a>
          ) : null}

          <div className="space-y-2 border-t border-zinc-100 pt-4">
            <AdminButton type="submit" variant="primary" disabled={saving} className="w-full">
              {saving ? "Saving…" : saveLabel ?? (isEdit ? "Save changes" : "Create")}
            </AdminButton>
            <AdminButton type="button" variant="secondary" onClick={onCancel} className="w-full">
              Cancel
            </AdminButton>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
