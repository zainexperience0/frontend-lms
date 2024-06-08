"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Course } from "@/types";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export const SearchInput = () => {
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<Course | null>(null);
  
    const debouncedSearch = useDebounce(search, 2000);
  
    useEffect(() => {
      if (debouncedSearch) {
        axios
          .get(`http://localhost:3001/api/courses/search/${debouncedSearch}`)
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          });
      }
    }, [debouncedSearch]); // Adding debouncedSearch as a dependency
  
    console.log(data);

  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
      <Input
        placeholder="Search..."
        className="w-full md:w-[300px] pl-10 rounded-full bg-slate-100 dark:bg-slate-800 focus-visible:ring-slate-200"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
