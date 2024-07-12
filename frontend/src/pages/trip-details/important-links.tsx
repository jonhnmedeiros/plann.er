import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";

interface Link {
    id: string
    title: string
    url: string
}

export function ImportantLinks() {
    const { tripId } = useParams()
    const [links, setLinks] = useState<Link[]>([])
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => {
            setLinks(response.data.links)
        })
    }, [tripId])

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                {links.map(link => {
                    return (
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-200">{link.title}</span>
                                <a href={link.url} target="_blank" className="block font-xs text-zinc-400 truncate hover:text-zinc-200">
                                    {link.url}
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>
                    )
                })}

            </div>

            {isCreateLinkModalOpen && (
                <CreateLinkModal closeCreateLinkModal={() => setIsCreateLinkModalOpen(false)} />
            )}

            <Button onClick={openCreateLinkModal} variant="secondary" size="full">
                Cadastrar novo link
                <Plus className='size-5' />
            </Button>
        </div>
    )
}