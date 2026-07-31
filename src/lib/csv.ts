/** Escape a value for CSV and join rows. */
export function toCsv(headers: string[], rows: (string | number | boolean | null | undefined)[][]): string {
  const escape = (value: string | number | boolean | null | undefined) => {
    const raw = value == null ? "" : String(value);
    if (/[",\n\r]/.test(raw)) {
      return `"${raw.replace(/"/g, '""')}"`;
    }
    return raw;
  };

  return [headers.map(escape).join(","), ...rows.map((row) => row.map(escape).join(","))].join("\n");
}

export function csvResponse(filename: string, csv: string) {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
