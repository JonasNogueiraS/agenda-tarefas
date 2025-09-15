import {useState, useEffect} from 'react'
import { auth } from '../fireBaseConection'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function Private({children}){
    //criar estado para saber se esta logado e um estado para se esta carregando
    const [carregando, setCarregando] = useState(true) //começa carregando para saber se tem ou nao usuario
    const [logado, setLogado] = useState(false)

    useEffect(()=>{
        async function verificarLogin(){
            const unsub = onAuthStateChanged(auth, (user)=>{
                if(user){
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    }
                    
                    localStorage.setItem('@detalheUser', JSON.stringify(userData));
                    setCarregando(false);
                    setLogado(true);
                }else{
                    //nao tem usuario logado
                    setCarregando(false)
                    setLogado(false)
                }
            })
        }
        verificarLogin()
    },[])

    if(carregando){
        return(
            <div></div>
        )
    }

    if(!logado){
        return(
            <Navigate to='/'/>
        )
    }

    return children;
}