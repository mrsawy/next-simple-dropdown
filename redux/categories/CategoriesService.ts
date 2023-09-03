import { BASE_API_URL } from "@/utils/url";

export const getCategoriesData = async () => {
  const data = await fetch(`${BASE_API_URL}category`);
  let response = await data.json();
  return response;
};
