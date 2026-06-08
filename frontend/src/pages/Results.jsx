import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Results() {

  const [results, setResults] = useState([]);

  useEffect(() => {

    loadResults();

  }, []);

  const loadResults = async () => {

    try {

      const response = await api.get("/results");

      setResults(response.data);

    } catch (error) {

      console.error(error);

      alert("Failed to load results");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>

        <h1>Interview Results</h1>

        <table border="1" cellPadding="10">

          <thead>

            <tr>
              <th>Question</th>
              <th>Score</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {results.map((result) => (

              <tr key={result.id}>

                <td>{result.question}</td>

                <td>{result.score}/10</td>

                <td>
                  {new Date(
                    result.created_at
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default Results;