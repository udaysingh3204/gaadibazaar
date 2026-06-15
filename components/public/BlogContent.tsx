function renderInline(text: string) {
  // Bold: **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#0A1628]">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function BlogContent({ content }: { content: string }) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let tableRows: string[][] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-6 space-y-1.5 my-4 text-gray-600">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, , ...rows] = tableRows;
      elements.push(
        <div key={key++} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#F8F7F4]">
                {header.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-left font-semibold text-[#0A1628] border-b border-gray-200">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2.5 text-gray-600 border-b border-gray-100">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) { flushList(); flushTable(); continue; }

    if (line.startsWith("## ")) {
      flushList(); flushTable();
      elements.push(
        <h2 key={key++} className="text-xl sm:text-2xl font-extrabold text-[#0A1628] mt-8 mb-3" style={{ fontFamily: "var(--font-syne)" }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList(); flushTable();
      elements.push(
        <h3 key={key++} className="text-lg font-bold text-[#0A1628] mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      flushTable();
      listItems.push(line.slice(2));
    } else if (line.startsWith("|")) {
      flushList();
      const cells = line.split("|").filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
      if (!cells.every((c) => /^[-:\s]+$/.test(c))) {
        tableRows.push(cells);
      }
    } else {
      flushList(); flushTable();
      elements.push(
        <p key={key++} className="text-gray-600 leading-relaxed my-3">
          {renderInline(line)}
        </p>
      );
    }
  }
  flushList();
  flushTable();

  return <div>{elements}</div>;
}
