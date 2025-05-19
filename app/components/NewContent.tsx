"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FilePlus, Plus } from 'lucide-react'
import TableContent from './TableContent'
import { postNewContent } from '../handler/apiHandler'
import { toast } from 'sonner'

function NewContent({ api, userRaw }: { api?: any, userRaw?: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [contentData, setContentData] = useState<any>({}); // Initialize with an empty object or appropriate default value
    const handleGetContentApi = async (api: string) => {
        console.log("API data:", JSON.parse(api));
        setContentData(JSON.parse(api));
    }
    const handleSendData = async () => {
        try {
            setIsSaving(true);
            const getContent = contentData
            console.log(getContent)

            const postData = await postNewContent(api, contentData, userRaw.primaryEmailAddressId, userRaw.email, userRaw.id);
            if (!postData) {
                toast.error('Failed to create event')
            } else if (!postData.success) {
                // Handle all types of errors (connection errors, HTTP errors)
                toast.error(postData.message || 'An unknown error occurred')
                console.error('Error response:', postData)
            } else {
                console.log(postData)
                toast.success(postData.message)
                setIsOpen(false) // Close the dialog on success
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred')
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            size="sm"
                            className="ml-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary"
                        >
                            <Plus className='h-4 w-4' />
                            New Content
                        </Button>
                    </motion.div>
                </DialogTrigger>
                <DialogContent className="bg-card border border-border shadow-md">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-xl text-foreground flex items-center gap-2">
                                <div className="h-6 w-6 rounded-md bg-primary/20 text-primary flex items-center justify-center">
                                    <FilePlus className="h-4 w-4" />
                                </div>
                                Create New Content
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Add content to your API: <span className="text-primary font-medium">"{api}"</span>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="my-6 space-y-4">
                            <TableContent handleGetDataApi={handleGetContentApi} />
                        </div>
                        <DialogFooter className="sm:justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                Cancel
                            </Button>                            <Button
                                onClick={handleSendData}
                                disabled={isSaving}
                                className={`bg-primary hover:bg-primary/90 text-primary-foreground `}
                            >
                                {isSaving ? 'Saving...' : 'Save Content'}
                            </Button>
                        </DialogFooter>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewContent
