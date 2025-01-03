'use client'

// Import the useParams hook
import { useParams } from 'next/navigation'
import BlurFadeText from '../components/blur-fade-text'
import { Avatar, AvatarImage, AvatarFallback } from '../components/avatar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BlurFade from '../components/blur-fade'
import Markdown from "react-markdown";
import { Badge } from '@/components/ui/badge'
import { GithubContributions } from '../components/github-calendar'
import { ResumeCard } from '../components/resume-card'


export default function Page() {
    const BLUR_FADE_DELAY = 0.04;


    const params = useParams()
    const username = params.username as string

    const [PROFILE, SETPROFILE] = useState<any>(null);
    const [SKILLS, SETSKILLS] = useState<any>(null);
    const [WORK, SETWORK] = useState<any>([]);

    useEffect(() => {
        async function fetchUsernameDetails() {
            let DATA = await axios.get(`http://127.0.0.1:8787/api/v1/user/userid/${username}`);
            console.log(DATA);
            SETPROFILE(DATA?.data?.fetchedDetails?.profile);
            SETSKILLS(DATA?.data?.fetchedDetails?.skills);
            SETWORK((prevWorks: any) => [...prevWorks, ...(DATA?.data?.fetchedDetails?.works || [])]);
        }
        fetchUsernameDetails();
    }, [username])

    return (
        <div id='mainPage' className='min-h-screen text-white  antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6  bg-[#08090a]'>
            <main className="flex  flex-col  space-y-10">
                {
                    PROFILE ? (
                        <>
                            <section id="hero">
                                <div className="mx-auto w-full max-w-2xl space-y-8">
                                    <div className="gap-2 flex justify-between">
                                        <div className="flex-col flex flex-1 space-y-1.5">
                                            <BlurFadeText
                                                delay={0.04}
                                                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                                yOffset={8}
                                                text={`Hi, I'm ${PROFILE.name.split(" ")[0]} 👋`}
                                            />
                                            <BlurFadeText
                                                className="max-w-[600px] md:text-xl"
                                                delay={0.09}
                                                text={PROFILE.about}
                                            />
                                        </div>
                                        <BlurFade delay={0.04}>
                                            <Avatar className="size-28 border">
                                                <AvatarImage alt={PROFILE.name} src={PROFILE.img} />
                                                <AvatarFallback>{PROFILE.initials || ""}</AvatarFallback>
                                            </Avatar>
                                        </BlurFade>
                                    </div>

                                </div>
                            </section>
                            <section id="about">
                                <BlurFade delay={0.04}>
                                    <h2 className="text-xl font-bold">About</h2>
                                </BlurFade>
                                <BlurFade delay={0.04}>
                                    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-white/80 dark:prose-invert">
                                        {PROFILE.aboutSection}
                                    </Markdown>
                                </BlurFade>
                            </section>
                            <section id="skills">
                                <div className="flex min-h-0 flex-col gap-y-3">
                                    <BlurFade delay={0.04 * 9}>
                                        <h2 className="text-xl font-bold">Skills</h2>
                                    </BlurFade>
                                    <div className="flex  flex-wrap gap-1">
                                        {SKILLS?.name?.map((skill: any, id: number) => {

                                            return (
                                                <BlurFade key={skill} delay={0.04 * 10 + id * 0.05}>
                                                    <Badge className='bg-white text-black hover:bg-white/70' key={skill}>{skill}</Badge>
                                                </BlurFade>
                                            )
                                        })}
                                    </div>
                                </div>
                            </section>
                            <section id="contributions">
                                <BlurFade delay={0.04 * 10}>
                                    <h2 className="text-xl mb-4 font-bold">GitHub Contributions</h2>
                                    <div id='gtc' className='bg-[#000000] rounded-xl'>
                                        <GithubContributions username={SKILLS?.githubUsername} />
                                    </div>
                                </BlurFade>
                            </section>

                            <section id="work">
                                <div className="flex min-h-0 flex-col bg-[#08090a] gap-y-3">
                                    <BlurFade delay={BLUR_FADE_DELAY * 5}>
                                        <h2 className="text-xl font-bold">Work Experience</h2>
                                    </BlurFade>
                                    
                                    {WORK.map((work: any, id: any) => (
                                        <div key={work.company}  className="workCard pb-2">
                                                <BlurFade
                                                key={work.company}
                                                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
                                            >
                                                <ResumeCard
                                                    key={work.company}
                                                    logoUrl={work.logoUrl}
                                                    altText={work.company}
                                                    title={work.company}
                                                    subtitle={work.title}
                                                    href={work.href}
                                                    badges={work.badges}
                                                    period={`${work.start} - ${work.end ?? "Present"}`}
                                                    description={work.description}
                                                />
                                            </BlurFade>

                                        </div>            

                                    ))}
                                </div>
                            </section>

                        </>


                    ) : (
                        <div>laoding.</div>
                    )
                }
            </main>
        </div>
    )
}