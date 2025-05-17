// components/CreateApis.tsx
'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { createApi } from '../handler/apiHandler'
import { Plus } from 'lucide-react'


const CreateApis = ({ userRaw }: any) => {
  const [apiName, setApiName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSendData = async () => {
    if (!apiName.trim()) return;
    
    setIsCreating(true);
    try {
      console.log(userRaw);
      const username = userRaw.primaryEmailAddressId ?? "";
      const email = userRaw.email;
      const id = userRaw.id;
      const nameUser = userRaw.username;
      
      await createApi(apiName, username, email, id, nameUser);
      setApiName("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating API:", error);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    
    <Dialog open={open} onOpenChange={setOpen}>      <DialogTrigger asChild>
        <Button 
          variant="default" 
          className="bg-primary text-primary-foreground font-medium shadow-md border-0"
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="h-4 w-4" />
            New API
          </motion.div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border border-border shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground">Create New API</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Give your API a descriptive name to easily identify it later.
            </DialogDescription>
          </DialogHeader>
          <div className="my-6">
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}              className="space-y-2"
            >
              <label htmlFor="apiName" className="text-sm font-medium text-foreground">API Name</label>
              <Input 
                placeholder="e.g., UserManagement, PaymentGateway" 
                id="apiName" 
                value={apiName}
                onChange={(e) => setApiName(e.target.value)}
                className="bg-background border-border text-foreground focus:border-primary focus:ring-primary/30"
              />
            </motion.div>
          </div>
        </motion.div>
        <DialogFooter className="sm:justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSendData} 
            disabled={isCreating || !apiName.trim()}
            className={`bg-primary hover:bg-primary/90 text-primary-foreground ${isCreating ? 'opacity-70' : ''}`}
          >
            {isCreating ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </div>
            ) : "Create API"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateApis
