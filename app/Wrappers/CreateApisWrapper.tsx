import { dataRaw } from '../handler/userData'
import CreateApis from '../components/CreateApis'
import ViewApis from '../components/ViewApis'

export default async function CreateApisWrapper() {
  const userRaw = await dataRaw()

  const safeUser = {
    primaryEmailAddressId: userRaw.primaryEmailAddressId ?? "",
    email: userRaw.emailAddresses?.[0]?.emailAddress ?? "",
    id: userRaw.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "",
    username: userRaw.username ?? "",
  } 
  return <CreateApis userRaw={safeUser} />
}
export async function ViewApisWrapper() {
  const userRaw = await dataRaw()

  const safeUser = {
    primaryEmailAddressId: userRaw.primaryEmailAddressId ?? "",
    email: userRaw.emailAddresses?.[0]?.emailAddress ?? "",
    id: userRaw.emailAddresses?.[0]?.linkedTo?.[0]?.id ?? "",
    username: userRaw.username ?? "",
  } 
  return <ViewApis userRaw={safeUser} />
}
