import Image from "next/image";
import { currentUser } from '@clerk/nextjs/server'
import { User } from "./handler/apiHandler";
import ViewApis from "./components/ViewApis";
import { dataRaw } from "./handler/userData";
import CreateApisWrapper, { ViewApisWrapper } from "./Wrappers/CreateApisWrapper";
import * as motion from "motion/react-client"
export default async function Home() {
      const userRaw = await dataRaw();
      // Usa las propiedades correctas del objeto user
      const username = userRaw?.primaryEmailAddressId ?? "";
      const email = userRaw?.emailAddresses?.[0]?.emailAddress ?? "";
      const id = userRaw?.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "";
      const nameUser = userRaw?.username ?? "";

      await User(username, email, id, nameUser);

      return (
        <div className="min-h-screen bg-background text-foreground">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16"
          >
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">Your API Collection</h2>
              <div className="bg-card/90 backdrop-blur rounded-lg p-6 border border-border shadow-md">
                <ViewApisWrapper />
              </div>
            </motion.section>
          </motion.div>
        </div>
      );
  }
