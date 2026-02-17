import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button onClick={() => router.back()}    className="fixed top-12 left-12 flex items-center gap-2 cursor-pointer hover:bg-neutral-800 px-4 py-2 rounded-full"><ArrowLeft /> <span>Back</span> </button>
    )
}