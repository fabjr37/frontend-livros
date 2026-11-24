import { useState } from 'react'
import './App.css'

function App() {
  // Estado para guardar a lista de livros
  const [livros, setLivros] = useState([])
  // Estado para controlar se está carregando
  const [carregando, setCarregando] = useState(false)
  // Estado para guardar mensagens de erro
  const [erro, setErro] = useState(null)

  // Função chamada ao clicar no botão "Buscar Livros"
  const buscarLivros = async () => {
    setCarregando(true)
    setErro(null)

    try {
      // Fazer requisição GET para /api/livros (via proxy do Vite)
      const response = await fetch('/api/livros', {
        method: 'GET'
      })

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      // Converter resposta para JSON
      const dados = await response.json()

      // A API retorna { "livros": [...] }, então pegamos dados.livros
      setLivros(dados.livros || [])
    } catch (err) {
      // Se der erro (API fora do ar, rede, etc.), mostrar mensagem clara
      setErro('Não foi possível buscar os livros. Verifique se a API está rodando em http://127.0.0.1:5000')
      setLivros([])
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="app">
      <h1>Catálogo de Livros</h1>

      {/* Botão para buscar livros - NÃO usa useEffect, só onClick */}
      <button onClick={buscarLivros} disabled={carregando}>
        {carregando ? 'Carregando livros...' : 'Buscar Livros'}
      </button>

      {/* Mensagem de erro */}
      {erro && <p className="erro">{erro}</p>}

      {/* Mensagem de carregamento */}
      {carregando && !erro && <p className="carregando">Carregando livros...</p>}

      {/* Lista de livros */}
      {livros.length > 0 && (
        <ul className="lista-livros">
          {livros.map((livro) => (
            <li key={livro.id} className="livro-item">
              <strong>ID:</strong> {livro.id} |
              <strong>Título:</strong> {livro.titulo} |
              <strong>Autor:</strong> {livro.autor} |
              <strong>Ano:</strong> {livro.ano}
            </li>
          ))}
        </ul>
      )}

      {/* Mensagem quando não há livros (mas não está carregando e não tem erro) */}
      {!carregando && !erro && livros.length === 0 && (
        <p className="vazio">Clique em "Buscar Livros" para carregar os dados da API.</p>
      )}
    </div>
  )
}

export default App