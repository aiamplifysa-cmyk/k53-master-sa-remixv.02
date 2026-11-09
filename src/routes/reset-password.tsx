import {createFileRoute,Link} from '@tanstack/react-router';
import {useEffect,useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {supabase} from '@/integrations/supabase/client';
import {pageHead} from '@/lib/metadata';
export const Route=createFileRoute('/reset-password')({head:()=>pageHead('Reset your password','Choose a new password for your K53 learner account.'),component:Reset});
function Reset(){const [recovery,setRecovery]=useState(false),[password,setPassword]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);useEffect(()=>{setRecovery(new URLSearchParams(window.location.hash.slice(1)).get('type')==='recovery');},[]);return <><div className="page-heading"><h1>Choose a new password.</h1></div><form className="auth-panel" onSubmit={async e=>{e.preventDefault();setBusy(true);const {error}=await supabase.auth.updateUser({password});setMessage(error?error.message:'Password updated. You can sign in with your new password.');setBusy(false);}}>{recovery?<><label>New password<Input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><Button disabled={busy}>Update password</Button></>:<p>Open the password reset link from your email to continue.</p>}<p role="status">{message}</p><Button asChild variant="link"><Link to="/auth">Back to sign in</Link></Button></form></>}
