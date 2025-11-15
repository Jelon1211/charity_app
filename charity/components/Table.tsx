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
      <table className="min-w-full leading-normal table-auto text-xs my-6">
        <caption className="caption-top py-2 text-base">
          Jestem transparentny. Zobacz na co i jak wpłacam.
        </caption>
        <thead className="bg-[var(--bgs)]">
          <tr>
            <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left text-xs font-semibold uppercase tracking-wider">
              Działalność
            </th>
            <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left text-xs font-semibold uppercase tracking-wider">
              Data przelewu
            </th>
            <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left text-xs font-semibold uppercase tracking-wider">
              Cel
            </th>
            <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left text-xs font-semibold uppercase tracking-wider">
              Kwota
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--bgs)]">
          {donations
            ? donations.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="px-5 py-5 border-b border-[var(--colorsecond)] text-sm"
                  >
                    <td className="px-5 py-5 border-b border-[var(--colorsecond)] text-sm">
                      <a
                        href={item.source_link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={item.source_link.img}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">
                              {item.source_link.text}
                            </p>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-[var(--colorsecond)] text-sm">
                      <p className="whitespace-no-wrap">{item.donated_at}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-[var(--colorsecond)] text-sm">
                      <p className="whitespace-no-wrap">
                        {" "}
                        {JSON.stringify(item.purpose)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-[var(--colorsecond)] text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 rounded-full"
                        ></span>
                        <span className="relative">{item.amount}</span>
                      </span>
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
