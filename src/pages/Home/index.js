import {useState} from 'react'
import './style.css' 
import { useNavigate, Link} from 'react-router-dom';
import {auth} from '../../fireBaseConection';
import {signInWithEmailAndPassword} from 'firebase/auth'


export default function Home(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate();
    async function handleLogin(e){ // por ser uma submissao do forms, recebemos um evento
        e.preventDefault(); //usar esse metodo para que a pagina nao seja atualizada, q seria o comportamento padrao do forms
        console.log("Teste")
        if(email !== '' && senha !== ''){
          await signInWithEmailAndPassword(auth, email, senha)
          .then(()=>{ 
            navigate('/admin',{replace: true}) //se tudo certo vamos para pagina admin
          })
          .catch((error)=>{
            console.log('ERRO'+error)
          })  
        }else{
            alert("campos vazios.")
        }
    }


    return(
        <div className='home-container'>
            <h1>Lista de Tarefas</h1>
            <span>Organize suas atividades</span>

            <form className='form-container' onSubmit={handleLogin}>
                <input placeholder='E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button type='submit'>Entrar</button>
            </form>
            <Link className='button-register' to='/register'>Clique aqui para se registrar</Link>
        </div>       
    );
}
