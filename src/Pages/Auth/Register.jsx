import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();

        try {

            const response = await fetch("/api/register", {
                method: "post",
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                navigate("/");
            } else if (response.status === 422) {
                setErrors(data.errors);
            } else {
                console.log("Something went wrong. Status code:", response.status);
            }
            
        } catch (error) {
            console.error("Something Error:", error);
        }
    }

    return (
        <>
            <h1 className="title">Register a new account</h1>

            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div className="h-10">
                    <input type="text" placeholder="Name" value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value }),
                            delete errors.name
                        }} />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>
                <div className="h-10">
                    <input type="text" placeholder="Email" value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value }),
                            delete errors.email
                        }} />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>
                <div className="h-10">
                    <input type="password" placeholder="Password" value={formData.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value }),
                            delete errors.password
                        }} />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>
                <div className="h-10">
                    <input type="password" placeholder="Confirm Password" value={formData.password_confirmation}
                        onChange={(e) => {
                            setFormData({ ...formData, password_confirmation: e.target.value }),
                            delete errors.password
                        }
                        } />
                </div>
                <button className="primary-btn">Register</button>
            </form>
        </>
    )
}