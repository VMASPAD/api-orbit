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
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // You'll need to create this component if not already present


import { FilePlus, Plus } from 'lucide-react'
import TableContent from './TableContent'

function NewContent({ api }: { api?: any }) {
    const [contentName, setContentName] = useState("");
    const [contentDescription, setContentDescription] = useState("");
    const [contentType, setContentType] = useState("json");
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSendData = async () => {
        if (!contentName.trim()) return;

        setIsSaving(true);
        try {
            // Here you'd implement the actual data saving
            console.log("Saving content:", { api, contentName, contentDescription, contentType });

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Reset form and close dialog
            setContentName("");
            setContentDescription("");
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving content:", error);
        } finally {
            setIsSaving(false);
        }
    }

    const contentTypes = [
        { id: "json", label: "JSON" },
        { id: "text", label: "Text" },
        { id: "html", label: "HTML" },
        { id: "markdown", label: "Markdown" }
    ];

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
                <DialogContent className="sm:max-w-lg bg-card border border-border shadow-md">
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
                            <TableContent />
                        </div>
                        <DialogFooter className="sm:justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSendData}
                                disabled={isSaving || !contentName.trim()}
                                className={`bg-primary hover:bg-primary/90 text-primary-foreground ${isSaving ? 'opacity-70' : ''}`}
                            >
                                {isSaving ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </div>
                                ) : "Save Content"}
                            </Button>
                        </DialogFooter>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewContent
