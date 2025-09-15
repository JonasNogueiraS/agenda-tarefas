import {useState} from 'react'
import {auth} from '../../fireBaseConection'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate, Link} from 'react-router-dom'



export default function Register(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    
    async function handleRegister(e){ // por ser uma submissao do forms, recebemos um evento
        e.preventDefault(); //usar esse metodo para que a pagina nao seja atualizada, q seria o comportamento padrao do forms
        //console.log("Teste")
        if(email !== '' && senha !== ''){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(()=>{
                navigate('/admin', {replace: true})
            })
            .catch(()=>{
                console.log('erro ao cadastrar.')
            });
        }else{
            alert("campos vazios.")
        }
    }


    return(
        <div className='home-container'>
            <h1>Registre-se</h1>
            <span>Preencha os campos a baixo</span>

            <form className='form-container' onSubmit={handleRegister}>
                <input placeholder='E-mail' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input placeholder='Senha' type='password' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button type='submit'>Criar Conta</button>
            </form>
            <Link className='button-register' to='/'>Já possui conta? Faça o login aqui.</Link>
        </div>       
    );
}
