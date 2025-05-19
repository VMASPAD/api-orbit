"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { deleteApi, getApi } from '../handler/apiHandler'
import NewContent from './NewContent'
import Editor from '@monaco-editor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ViewJSON from './ViewJSON'
import { Trash2Icon } from 'lucide-react'
import ConnectApi from './ConnectApi'

function ViewApis({ userRaw }: any) {
  const [apiData, setApiData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApi(userRaw.primaryEmailAddressId, userRaw.email, userRaw.id);
      setApiData(data);
    };
    fetchData();
  }, [userRaw]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  const handleDeleteApi = async (apiName: string) => { 
    const api = await deleteApi(apiName, userRaw.primaryEmailAddressId, userRaw.email, userRaw.id)
    console.log(api)
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='flex items-center justify-center py-12'
    >      {!apiData?.apis?.length ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200
        }}
        className="text-center p-8 bg-card/60 rounded-lg border border-border shadow-md"
      >
        <div className="text-muted-foreground mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <line x1="3" x2="21" y1="9" y2="9"></line>
            <path d="m9 16 3-3 3 3"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-foreground">No APIs Found</h3>
          <p>Create your first API to get started</p>
        </div>
      </motion.div>
    ) : (
      <Carousel
        opts={{
          align: "center", dragFree: true,
        }}
        className="w-full max-w-3xl"
      >
        <CarouselContent>
          {apiData?.apis?.map((api: any, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                className="p-2"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="bg-card/70 border-border backdrop-blur overflow-hidden shadow-md">
                  <CardHeader className="bg-accent/10 pb-2">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                        {api.name}
                      </CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                    <motion.div
                      className="w-full"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex flex-row gap-5 items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className=" bg-background/50 hover:bg-background border-border hover:border-primary transition-all duration-300"
                          >
                            View API
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card border-border text-foreground">
                          <DialogHeader>
                            <DialogTitle className="text-xl flex justify-between items-center">
                              <span className="text-primary">API: {api.name}</span>                                <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <NewContent api={api.name} userRaw={userRaw} />
                              </motion.div>
                            </DialogTitle>
                            <DialogDescription className="mt-4">
                              <div className="bg-background p-4 rounded-md font-mono text-sm overflow-auto max-h-[400px] border border-border">
                                <Tabs defaultValue="JSON" className="">
                                  <TabsList>
                                    <TabsTrigger value="JSON">View JSON</TabsTrigger>
                                    <TabsTrigger value="Editor">Text JSON</TabsTrigger>
                                    <TabsTrigger value="Preview">Connect API</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="JSON">
                                    <ViewJSON dataContent={JSON.stringify(api.content || [], null, 2)} dataUser={userRaw} apiName={api.name} />
                                  </TabsContent>
                                  <TabsContent value="Editor">
                                    <Editor height="90vh" options={{ readOnly: true }} width="90vh" theme="vs-dark" defaultLanguage="json" defaultValue={JSON.stringify(api.content || [], null, 2)} />
                                  </TabsContent>
                                  <TabsContent value="Preview">
                                    <ConnectApi apiName={api.name} dataUser={userRaw}/>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            variant="outline"
                            className="w-full bg-background/50 hover:bg-background border-border hover:border-primary transition-all duration-300"
                          >
                          <Trash2Icon className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure to eliminate {api.name}?</DialogTitle>
                            <DialogDescription className='flex flex-col items-center justify-center gap-10'>
                              <p className='font-bold'>THIS ACTION IS NOT REVERSIBLE </p>
                              <Button onClick={() => handleDeleteApi(api.name)} className='bg-destructive hover:bg-destructive/80 transition-colors'>
                                Delete API
                              </Button>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      </div> 
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/*  <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="relative mr-2 hover:bg-muted hover:text-primary transition-colors" />
            <CarouselNext className="relative ml-2 hover:bg-muted hover:text-primary transition-colors" />
          </div> */}
      </Carousel>
    )}
    </motion.div>

  )
}

export default ViewApis
