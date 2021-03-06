import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, ImageSquare, Lightning } from "phosphor-react";
import { SpinnerLoading } from "./SpinnerLoading";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";

// TODO -> Fazer ficar responsivo

interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: { 
            slug: props.lessonSlug
        },
        fetchPolicy: "no-cache"
    })

    // Desafio -> Fazer um spinner enquanto carrega a página
    if (!data || !data.lesson) {
        return (
            <header className="w-full flex flex-col items-center justify-center">
                <SpinnerLoading />
                <p className="text-2xl mt-5">Loading...</p>
            </header>
        )
    }

    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>
            
                <div className="p-8 max-w-[1100px] mx-auto">
                    <div className="flex items-start gap-16">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">
                                {data.lesson.title}
                            </h1>
                            <p className="mt-4 text-gray-200 leading-relaxed">
                                {data.lesson.description}
                            </p>

                            {data.lesson.teacher && (
                                <div className="flex items-center gap-4 mt-6">
                                <img
                                    className="h-16 w-16 rounded-full border-2 border-blue-500"
                                    src={data.lesson.teacher.avatarURL}
                                    alt={data.lesson.teacher.name}
                                />

                                <div className="leading-relaxed">
                                    <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                                    <span className="teext-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                                </div>
                            </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <a href="https://discord-service.rocketseat.dev/signin/ignite-lab" target="_blank" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                                <DiscordLogo size={24} />
                                Comunidade do discord
                            </a> 

                            {/*
                            TODO -> Criar componente de estilização para não ficar repetindo o className
                            Ex -> <Button varian="primary" />
                            */}

                            <a href="" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
                                <Lightning size={24} />
                                Acesse o desafio
                            </a>
                        </div>
                    </div>

                    <div className="gap-8 mt-20 grid grid-cols-2">
                        <a href="https://efficient-sloth-d85.notion.site/Material-complementar-86d4ef35af16471ebc3ae3eba1a378e5" target="_blank" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                            <div className="bg-green-700 h-full p-6 flex items-center">
                                <FileArrowDown size={40} />
                            </div>
                            <div className="py-6 leading-relaxed">
                                <strong className="text-2xl">
                                    Material complementar
                                </strong>
                                <p className="text-sm text-gray-200 mt-2">
                                    Acesse o material complementar para acelerar o seu desenvolvimento
                                </p>
                            </div>
                            <div className="h-full p-6 flex items-center">
                                <CaretRight size={24} />
                            </div>
                        </a>

                        <a href="https://drive.google.com/drive/folders/1mxWnvlqmH7MbVRv2Na9xFNgCQCygM1iR" target="_blank" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
                            <div className="bg-green-700 h-full p-6 flex items-center">
                                <ImageSquare size={40} />
                            </div>
                            <div className="py-6 leading-relaxed">
                                <strong className="text-2xl">
                                    Wallpapers exclusivos
                                </strong>
                                <p className="text-sm text-gray-200 mt-2">
                                    Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                                </p>
                            </div>
                            <div className="h-full p-6 flex items-center">
                                <CaretRight size={24} />
                            </div>
                        </a>
                    </div>
                
                    <div className="mt-10 text-sm leading-relaxed">
                        <p>Site produzido durante o Ignite Lab - Jun/2022</p>
                        <p>Dev - Matheus Zidane Vidal Ferro</p>

                    </div>

                </div>
            </div>
    )
}
