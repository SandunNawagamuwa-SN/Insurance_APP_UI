import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Select from 'react-dropdown-select';

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AppContext);
    
    const [formData, setFormData] = useState({
        policy_number: "",
        holder_name: "",
        type_of_insurance: "",
        coverage_amount: "",
    });

    const [errors, setErrors] = useState({});

    const [inusrancePolicy, setInusrancePolicy] = useState(null);

    const options = [
        { label: 'Term', value: 'TERM' },
        { label: 'Whole', value: 'WHOLE' },
        { label: 'Universal', value: 'UNIVERSAL' }
    ];

    async function getInusrancePolicy() {
        const response = await fetch(`/api/insurancePolicies/${id}`);
        const payload = await response.json();

        if (response.ok) {
            setFormData({
                policy_number: payload.data.policy_number,
                holder_name: payload.data.holder_name,
                type_of_insurance: payload.data.type_of_insurance,
                coverage_amount: payload.data.coverage_amount,
            });
            setInusrancePolicy(payload.data);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        try{
            const response = await fetch(`/api/insurancePolicies/${id}`, {
                method: "put",
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
        }catch (error) {
            console.error("Something Error:", error);
        }        
    }

    useEffect(() => {
        getInusrancePolicy();
    }, []);

    return (
        <>
            {inusrancePolicy ? (
                <>
                    <h1 className="title">Update Insurance Policy</h1>

                    <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6">
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
                            {errors.holder_name && <p className="error">{errors.holder_name[0]}</p>}
                        </div>
                        <div className="h-10">
                            <Select
                                options={options}
                                value={formData.type_of_insurance}
                                placeholder="Select an Insurance Type"
                                onChange={(e) => {
                                    setFormData({ ...formData, type_of_insurance: e[0]?.value }),
                                        delete errors.type_of_insurance
                                }}

                            />
                            {errors.type_of_insurance && <p className="error">{errors.type_of_insurance[0]}</p>}
                        </div>
                        <div className="h-14">
                            <input type="text" placeholder="Coverage Amount" value={formData.coverage_amount}
                                onChange={(e) => {
                                    setFormData({ ...formData, coverage_amount: e.target.value }),
                                        delete errors.coverage_amount
                                }
                                } />
                            {errors.coverage_amount && <p className="error">{errors.coverage_amount[0]}</p>}
                        </div>
                        <button className="primary-btn">Update</button>
                    </form>
                </>
            ) : (
                <p className="title">Insurance Policy not found!</p>
            )}
        </>
    );
}