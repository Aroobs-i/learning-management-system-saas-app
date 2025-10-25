"use client";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        // prevent running on initial mount when state matches URL
        if (subject === query || subject === "") return;
    
        let newUrl = "";
        if (subject === "all") {
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });
        } else {
          newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "subject",
            value: subject,
          });
        }
    
        // only push if the URL is actually different
        const currentUrl = `${pathname}?${searchParams.toString()}`;
        if (newUrl !== currentUrl) {
          router.push(newUrl, { scroll: false });
        }
    
        // ⚠️ don't depend on searchParams – it changes every render
      }, [subject, router, pathname]);
    

    
    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;