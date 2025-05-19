import { dataRaw } from '../handler/userData'
import CreateApis from '../components/CreateApis'
import ViewApis from '../components/ViewApis'
import NewContent from '../components/NewContent'

export default async function CreateApisWrapper() {
  const userRaw = await dataRaw()

  const safeUser = {
    primaryEmailAddressId: userRaw?.primaryEmailAddressId ?? "",
    email: userRaw?.emailAddresses?.[0]?.emailAddress ?? "",
    id: userRaw?.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "",
    username: userRaw?.username ?? "",
  } 
  return <CreateApis userRaw={safeUser} />
}

export async function ViewApisWrapper() {
  const userRaw = await dataRaw()

  const safeUser = {
    primaryEmailAddressId: userRaw?.primaryEmailAddressId ?? "",
    email: userRaw?.emailAddresses?.[0]?.emailAddress ?? "",
    id: userRaw?.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "",
    username: userRaw?.username ?? "",
  } 
  return <ViewApis userRaw={safeUser} />
}

export async function NewContentWrapper({ api }: { api?: string }) {
  const userRaw = await dataRaw()

  const safeUser = {
    primaryEmailAddressId: userRaw?.primaryEmailAddressId ?? "",
    email: userRaw?.emailAddresses?.[0]?.emailAddress ?? "",
    id: userRaw?.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "",
    username: userRaw?.username ?? "",
  } 
  return <NewContent api={api} userRaw={safeUser} />
}