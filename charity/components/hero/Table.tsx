import { Donation } from "../../types/Table";

interface TableProps {
  latestDonations: Donation[];
}

export default function Table({ latestDonations }: TableProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <table className="min-w-full rounded-sm table-auto text-xs my-6">
        <caption className="caption-top py-2 text-base">
          Jestem transparenty. Zobacz na co i jak wpłacam.
        </caption>
        <thead className="bg-neutral-700 divide-neutral-600">
          <tr className="divide-x divide-neutral-600">
            <th className="px-6 py-3 text-left">Działalność</th>
            <th className="px-6 py-3 text-left">Data przelewu</th>
            <th className="px-6 py-3 text-left">Kwota</th>
            <th className="px-6 py-3 text-left">Cel</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-neutral-600">
          {latestDonations
            ? latestDonations.map((item) => {
                return (
                  <tr key={item.id} className="divide-x divide-neutral-600">
                    <td className="px-6 py-4">{item.source_link}</td>
                    <td className="px-6 py-4">{item.donated_at}</td>
                    <td className="px-6 py-4">{item.amount}</td>
                    <td className="px-6 py-4">
                      {JSON.stringify(item.purpose)}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
