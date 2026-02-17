import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function BackButton({className, path}: {className?: string, path?: string}) {
    const router = useRouter();
    const handleRedirection=()=>{
        if(path){
            router.push(path)
        }else{
            router.back()
        }
    }
    return (
        <button onClick={handleRedirection}    className={clsx(twMerge(`fixed top-12 left-12 flex items-center gap-2 cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-full`, className))}><ArrowLeft /> <span>Back</span> </button>
    )
}