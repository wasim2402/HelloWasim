"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Timeline } from "@/components/Timeline";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const BackButton = () => {
    const { getAccentColor } = useTheme();
    return (
        <Link href="/" className="inline-block mb-8">
            <motion.button
                whileHover={{ x: -5 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-[15px] bg-neutral-900 border border-neutral-800 text-white hover:border-white/20 transition-colors`}
            >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </motion.button>
        </Link>
    );
};

export default function AboutPage() {
    const data = [
        {
            title: "School",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Completed my secondary education with a focus on Science and Mathematics.
                        Participated in various science fairs and coding competitions.
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                            <h4 className="text-white font-bold mb-1">High School</h4>
                            <p className="text-neutral-400 text-xs">2016 - 2018</p>
                        </div>
                        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                            <h4 className="text-white font-bold mb-1">Secondary School</h4>
                            <p className="text-neutral-400 text-xs">2014 - 2016</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "College",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Pursued a Bachelor's degree in Computer Science. Deep dived into algorithms,
                        data structures, and web development. Built several projects including a
                        student management system and a personal portfolio.
                        <br /><br />
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                            <h4 className="text-white font-bold mb-1">B.Tech CSE</h4>
                            <p className="text-neutral-400 text-xs">2018 - 2022</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "After College",
            content: (
                <div>
                    <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Started my professional journey as a Full Stack Developer. Working on
                        scalable web applications and exploring new technologies like Next.js,
                        TypeScript, and Cloud Computing.
                        <br /><br />
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                    </p>
                    <div className="mb-8">
                        <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
                            ✅ Built 10+ Production Ready Apps
                        </div>
                        <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
                            ✅ Contributed to Open Source
                        </div>
                        <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
                            ✅ Mentored Juniors
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-black text-white overflow-x-hidden">
                <Navbar />
                <div className="pt-32 px-4 md:px-10 max-w-7xl mx-auto">
                    <BackButton />
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/10">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">About Me</h1>
                            <p className="text-neutral-400 max-w-xl">
                                I am a passionate developer who loves to build things for the web.
                                Here is a glimpse into my journey so far.
                            </p>
                        </div>
                    </div>
                </div>
                <Timeline data={data} />
                <div className="mt-16 text-center pb-10">
                    <Link href="/" className="inline-block">
                        <motion.button
                            whileHover={{ x: -5 }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-[15px] bg-neutral-900 border border-neutral-800 text-white hover:border-white/20 transition-colors shadow-lg`}
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Home</span>
                        </motion.button>
                    </Link>
                </div>
                <Footer />
            </div>
        </ThemeProvider>
    );
}
