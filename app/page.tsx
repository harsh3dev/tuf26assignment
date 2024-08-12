
import Slider from "@/app/components/Slider"
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between text-text bg-background ">
            <Navbar/>
            <div className="w-full h-full min-h-[80vh] grid place-items-center ">
                <Slider/>
            </div>
        </main>
    );
}
