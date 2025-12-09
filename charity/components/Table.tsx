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
    <div className="flex flex-col justify-center items-center w-full">
      <div className="md:hidden w-full space-y-4 my-6">
        <p className="text-base font-semibold text-center">
          Jestem transparentny. Zobacz na co i jak wpłacam.
        </p>

        {donations?.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--bgs)] border border-[var(--colorsecond)] rounded-lg p-4 text-sm"
          >
            <a
              href={item.source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 mb-3"
            >
              <img
                className="w-12 h-12 rounded-full"
                src={item.source.img}
                alt=""
              />
              <p className="font-semibold">{item.source.text}</p>
            </a>

            <p>
              <span className="font-semibold">Data: </span>
              {item.donated_at}
            </p>

            <p className="mt-1">
              <span className="font-semibold">Cel: </span>
              <a
                href={item.purpose.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {item.purpose.description}
              </a>
            </p>

            <p className="mt-1">
              <span className="font-semibold">Kwota: </span>
              <span className="inline-block px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full">
                {item.amount}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto hidden md:block w-full">
        <table className="min-w-full leading-normal table-auto text-xs my-6">
          <caption className="caption-top py-2 text-base">
            Jestem transparentny. Zobacz na co i jak wpłacam.
          </caption>
          <thead className="bg-[var(--bgs)]">
            <tr>
              <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left font-semibold uppercase tracking-wider">
                Działalność
              </th>
              <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left font-semibold uppercase tracking-wider">
                Data przelewu
              </th>
              <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left font-semibold uppercase tracking-wider">
                Cel
              </th>
              <th className="px-5 py-3 border-b-2 border-[var(--colorsecond)] text-left font-semibold uppercase tracking-wider">
                Kwota
              </th>
            </tr>
          </thead>

          <tbody className="bg-[var(--bgs)]">
            {donations?.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--colorsecond)] text-sm"
              >
                <td className="px-5 py-5">
                  <a
                    href={item.source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.source.img}
                        alt=""
                      />
                      <p className="ml-3 whitespace-nowrap">
                        {item.source.text}
                      </p>
                    </div>
                  </a>
                </td>

                <td className="px-5 py-5 whitespace-nowrap">
                  {item.donated_at}
                </td>

                <td className="px-5 py-5 whitespace-nowrap">
                  <a
                    href={item.purpose.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {item.purpose.description}
                  </a>
                </td>

                <td className="px-5 py-5">
                  <span className="inline-block px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full">
                    {item.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-6 text-xl mt-2">
        <button
          onClick={prevPage}
          disabled={offset === 0 || loading}
          className={`px-3 py-1 ${
            offset === 0 ? "opacity-40 cursor-default" : "cursor-pointer"
          }`}
        >
          <Image
            src="/v2.svg"
            alt="left arrow"
            width={15}
            height={15}
            style={{ width: "auto", height: "auto" }}
          />
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
          <Image
            src="/v1.svg"
            alt="right arrow"
            width={15}
            height={15}
            style={{ width: "auto", height: "auto" }}
          />
        </button>
      </div>
    </div>
  );
}
