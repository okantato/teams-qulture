import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/companies")
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar empresas:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Empresas</h1>
      <ul className="space-y-2">
        {companies.map(company => (
          <li key={company.id} className="border p-4 rounded bg-white shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p><strong>Funcionários:</strong> {company.employees.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
