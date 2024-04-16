"use client";
import Navbar from "@/components/Navbar";
import { fetchCitiesData } from "@/services/wetherServices";
import { SearchOutlined } from "@ant-design/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Input, Table, TableColumnsType } from "antd";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface DataType {
  geoname_id: number;
  ascii_name: string;
  cou_name_en: string;
  population: number;
  timezon: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Geoname Id",
    dataIndex: "geoname_id",
    key: "geoname_id",
  },
  {
    title: "City",
    dataIndex: "ascii_name",
    key: "ascii_name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Mumbai",
        value: "Mumbai",
      },
      {
        text: "Delhi",
        value: "Delhi",
      },
      {
        text: "Bangalore",
        value: "Bangalore",
      },
      {
        text: "Kolkata",
        value: "Kolkata",
      },
    ],
    filterSearch: true,
    onFilter: (value, record) =>
      record.ascii_name.indexOf(value as string) === 0,
    render: (text) => (
      <Link href={`/${text}`} className="text-blue-700">
        {text}
      </Link>
    ),
  },
  {
    title: "Country",
    dataIndex: "cou_name_en",
    key: "cou_name_en",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "India",
        value: "India",
      },
      {
        text: "U S",
        value: "US",
      },
      {
        text: "Afghanistan",
        value: "Afghanistan",
      },
    ],
    filterSearch: true,
    onFilter: (value, record) =>
      record.cou_name_en.indexOf(value as string) === 0,
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    sorter: (a, b) => a.population - b.population,
  },
  {
    title: "Timezone",
    dataIndex: "timezone",
    key: "timezone",
  },
];

export default function Home() {
  const [searchedText, setSearchedText] = useState<string>("");
  const tableRef: Parameters<typeof Table>[0]["ref"] = useRef(null);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [searchedData, setSearchedData] = useState<DataType[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["cities", searchedText],
    queryFn: ({ pageParam }) => fetchCitiesData({ pageParam, searchedText }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

  console.log(
    "Data: ",
    data?.pages.flatMap((page) => page.results)
  );

  useEffect(() => {
    if (data) {
      if (searchedText === "") {
        setTableData((prevData) => [
          ...prevData,
          ...data?.pages.flatMap((page) => page.results),
        ]);
      } else {
        setTableData([...data?.pages.flatMap((page) => page.results)]);
      }
    }
  }, [data]);

  // console.log("Table Data: ", tableData);

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (
      scrollHeight - scrollTop === clientHeight &&
      hasNextPage &&
      !isFetching
    ) {
      fetchNextPage();
    }
  };

  return (
    <main>
      <Navbar />
      <section className="px-20 py-1 bg-slate-100">
        <div className="my-10 bg-white shadow-md p-5 rounded-lg">
          <Input
            type="text"
            className="mb-3"
            suffix={<SearchOutlined />}
            placeholder="Search City..."
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
          />
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <>
              <Table
                dataSource={tableData}
                columns={columns}
                pagination={false}
                bordered
                virtual
                scroll={{ x: 500, y: 500 }}
                ref={tableRef}
                onScroll={handleScroll}
                sticky={{ offsetHeader: 50 }}
              />
              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
