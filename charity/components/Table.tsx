"use client";
import { useState } from "react";
import { Donation } from "../types/Table";
import Image from "next/image";

interface TableProps {
  latestDonations: Donation[];
}

export default function Table({ latestDonations }: TableProps) {
  const [donations, setDonations] = useState<Donation[]>(latestDonations);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function loadPage(newOffset: number) {
    setLoading(true);

    try {
      const res = await fetch(`/api/open?offset=${newOffset}`);
      const newData: Donation[] = await res.json();

      if (newData.length > 0) {
        setDonations(newData);
        setOffset(newOffset);
      }
    } finally {
      setLoading(false);
    }
  }

  function nextPage() {
    loadPage(offset + 3);
  }

  function prevPage() {
    if (offset - 3 >= 0) {
      loadPage(offset - 3);
    }
  }

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
          {donations
            ? donations.map((item) => {
                return (
                  <tr key={item.id} className="divide-x divide-neutral-600">
                    <td className="px-6 py-4">
                      <a
                        href={item.source_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.source_link}
                      </a>
                    </td>
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

      <div className="flex gap-6 text-xl">
        <button
          onClick={prevPage}
          disabled={offset === 0 || loading}
          className={`px-3 py-1 ${
            offset === 0 ? "opacity-40 cursor-default" : "cursor-pointer"
          }`}
        >
          <Image src="/v2.svg" alt="left arrow" width={15} height={15} />
        </button>

        <button
          onClick={nextPage}
          disabled={donations.length < 3 || loading}
          className={`px-3 py-1 ${
            donations.length < 3
              ? "opacity-40 cursor-default"
              : "cursor-pointer"
          }`}
        >
          <Image src="/v1.svg" alt="right arrow" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}
