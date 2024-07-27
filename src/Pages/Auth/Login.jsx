import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const [inValidCredentials, setInvalidCredentials] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        try {

            const response = await fetch("/api/login", {
                method: "post",
                body: JSON.stringify(formData),
            });

            const payload = await response.json();

            if (response.ok) {
                localStorage.setItem("token", payload.data.token);
                setToken(payload.data.token);
                navigate("/");
            } else if (response.status === 422) {
                setErrors(payload.errors);
            } else if (response.status === 401) {
                setInvalidCredentials(true);
            } else {
                console.log("Something went wrong. Status code:", response.status);
            }


        } catch (error) {
            console.error("Something Error:", error);
        }
    }

    return (
        <>
            <h1 className="title">Login to your account</h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value }),
                                delete errors.email
                            }
                        }
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value }),
                                delete errors.password
                            }   
                        }
                    />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>
                {inValidCredentials && <p className="error">Invalid Credentials</p>}

                <button className="primary-btn">Login</button>
            </form>
        </>
    );
}