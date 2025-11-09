import Image from "next/image";

export default function Logo() {
    return (
        <div className="flex items-center">
            <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                    src="/0fb9f65e2661db2b87893ff105f63e194a80db14.png"
                    alt="FitPlay Logo"
                    width={40}
                    height={40}
                    className="rounded-lg object-contain"
                    priority
                />
            </div>
        </div>
    );
}