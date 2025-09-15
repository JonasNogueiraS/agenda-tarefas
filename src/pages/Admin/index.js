import "./admin.css";
import { useState, useEffect } from "react";
import { auth, dataBase } from "../../fireBaseConection";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const[edit, setEdit] = useState({})

  useEffect(() => {
    async function loadTarefas() {
      const userDetails = localStorage.getItem("@detalheUser");
      setUser(JSON.parse(userDetails));

      if (userDetails) {
        const data = JSON.parse(userDetails);

        const tarefaRef = collection(dataBase, "tarefas");
        const qery = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(qery, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          setTarefas(lista);
        });
      }
    }
    loadTarefas();
  }, []);

  async function handleRegistrar(e) {
    e.preventDefault();

    if (tarefaInput === "") {
      alert("Digite algo para salvar.");
      return;
    }

    if(edit?.id){
      handleUpdateTarefa();
      return;
    }

    await addDoc(collection(dataBase, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid, //? caso venha vazio, ele n crasha o codigo só envia vazio
    })
      .then(() => {
        console.log("Tarefa salva.");
        setTarefaInput("");
      })
      .catch((error) => {
        console.log("erro ao cadastrar" + error);
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function doneTarefa(id){
    const refTarefa = doc(dataBase, "tarefas", id);
    await deleteDoc(refTarefa);
  }

  function editTarefa(item){
    setTarefaInput(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa(){
    const refDoc = doc(dataBase, "tarefas", edit?.id)
    await updateDoc(refDoc, {
      tarefa: tarefaInput,
    })
    .then(()=>{
      console.log("tarefa atualizada")
      setTarefaInput("")
      setEdit({})
    })
    .catch((error)=>{
      console.log("erro ao editar" + error);
      setTarefaInput('')
      setEdit({})
    })
  }

  return (
    <div className="admin-container">
      <h1> Tarefas do dia</h1>

      <form onSubmit={handleRegistrar} className="form-container">
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />
        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit" style={{backgroundColor: '#6add39' }}>
          Atualizar Tarefa
        </button>
        ) : (<button className="btn-register" type="submit">
        Adicionar Tarefa
      </button> )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className="list">
          <p>{item.tarefa}</p>
          <div>
            <button onClick={()=>editTarefa(item)}>Editar</button>
            <button className="btn-done" onClick={()=>doneTarefa(item.id)}>Concluir</button>
          </div>
        </article>
      ))}

      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>
    </div>
  );
}
