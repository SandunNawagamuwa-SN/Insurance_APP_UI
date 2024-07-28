import React, { useContext, useState } from 'react';
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Select from 'react-dropdown-select';

export default function Create() {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const [formData, setFormData] = useState({
        policy_number: "",
        holder_name: "",
        type_of_insurance: "",
        coverage_amount: "",
    });

    const options = [
        { label: 'Term', value: 'TERM' },
        { label: 'Whole', value: 'WHOLE' },
        { label: 'Universal', value: 'UNIVERSAL' }
    ];

    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();

        try {
            const response = await fetch("/api/insurancePolicies", {
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const payload = await response.json();
            if (response.ok) {
                navigate("/");
            } else if (response.status === 422) {
                setErrors(payload.errors);
            } else {
                console.log("Something went wrong. Status code:", response.status);
            }
        } catch (error) {
            console.error("Something Error:", error);
        }
    }

    return (
        <>
            <h1 className="title">Create a new Insurance Policy</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div className="h-10">
                    <input type="text" placeholder="Policy Number" value={formData.policy_number}
                        onChange={(e) => {
                            setFormData({ ...formData, policy_number: e.target.value }),
                                delete errors.policy_number
                        }} />
                    {errors.policy_number && <p className="error">{errors.policy_number[0]}</p>}
                </div>
                <div className="h-10">
                    <input type="text" placeholder="Holder Name" value={formData.holder_name}
                        onChange={(e) => {
                            setFormData({ ...formData, holder_name: e.target.value }),
                                delete errors.holder_name
                        }} />
                    {errors.holder_name && <p className="error">{errors.email[0]}</p>}
                </div>
                <div className="h-10">
                    <Select
                        options={options}
                        placeholder="Select an Insurance Type"
                        onChange={(e) => {
                            setFormData({ ...formData, type_of_insurance: e[0]?.value }),
                                delete errors.type_of_insurance
                        }}

                    />
                    {errors.type_of_insurance && <p className="error">{errors.password[0]}</p>}
                </div>
                <div className="h-10">
                    <input type="text" placeholder="Coverage Amount" value={formData.coverage_amount}
                        onChange={(e) => {
                            setFormData({ ...formData, coverage_amount: e.target.value }),
                                delete errors.coverage_amount
                        }
                        } />
                </div>
                <button className="primary-btn">Create Policy</button>
            </form>

        </>
    )
}