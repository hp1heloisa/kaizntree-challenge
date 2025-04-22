
import styles from "@/styles/index.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter()

  console.log(status)

  useEffect(()=>{
    if (status === "unauthenticated") {
      router.push('/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  } 

  if (!session) return null; 
  
  return <div>

<h1>Bem-vinda, {session.user.email}</h1>
<button onClick={() => signOut({ callbackUrl: "/signin" })}>Sair</button>
  </div>
}
