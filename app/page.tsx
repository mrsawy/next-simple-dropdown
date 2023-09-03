"use client";
import Skeleton from "react-loading-skeleton";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  setSelectedParentCategory,
  setSelectedChildCategory,
  setChildCategories,
} from "@/redux/categories/categoriesSlice";
import { AppDispatch } from "@/redux/store";
import CustomDropdown from "@/components/CustomDropdown";
export default function Home() {
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  let dispatch = useDispatch<AppDispatch>();

  let {
    isLoading,
    parentCategories,
    selectedParentCategory,
    childCategories,
    selectedChildCategory,
  } = useSelector((s: any) => s.categories);

  let changeParentCategoryHandler = useCallback((e: any) => {
    dispatch(setSelectedParentCategory(e.value));
    dispatch(setChildCategories(e.value.children));
  }, []);

  let changeChildCategoryHandler = useCallback((e: any) => {
    dispatch(setSelectedChildCategory(e.value));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-20 p-24">
      {isLoading ? (
        <div className="w-full ">
          <Skeleton
            baseColor="#848080"
            highlightColor="#dcdada"
            count={6}
            className="w-full md:w-14rem gap-20 m-2"
          />
        </div>
      ) : (
        <>
          <CustomDropdown
            options={parentCategories}
            onChange={changeParentCategoryHandler}
            selected={selectedParentCategory}
            labelName={`Main categories`}
          />
          <CustomDropdown
            options={childCategories}
            onChange={changeChildCategoryHandler}
            selected={selectedChildCategory}
            skeleton={false}
            labelName={`Sub categories`}
          />
        </>
      )}
    </main>
  );
}
