import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (
        <nav
            style={{
                padding: "15px",
                backgroundColor: "#1f2937",
                display: "flex",
                gap: "20px",
                color: "white"
            }}
        >
            <h3>AI Mock Interview</h3>

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/generate">
                Generate Interview
            </Link>

            <Link to="/history">
                History
            </Link>

            <Link to="/results">
                Results
            </Link>

            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;