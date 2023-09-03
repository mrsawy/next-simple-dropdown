"use client";
import Skeleton from "react-loading-skeleton";
import { Dropdown } from "primereact/dropdown";

export default function Home({
  options = [],
  selected = null,
  onChange = (e:any) => {},
  skeleton = true
}) {
  return (
    <>
      {(options.length < 1 ) && skeleton ? (
        <div className="w-full ">
          <Skeleton
            baseColor="#848080"
            highlightColor="#dcdada"
            count={3}
            className="w-full md:w-14rem"
          />
        </div>
      ) : (
        <Dropdown
          value={selected}
          onChange={onChange}
          options={options}
          optionLabel="name"
          placeholder="Select a Category"
          className="w-full"
        />
      )}
    </>
  );
}
