import { useEffect, useState, useContext } from "react";
import Pagination from "../Component/Pagination";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Home() {
    const { user } = useContext(AppContext);
    const [insurancePolicies, setInsurancePolicies] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    async function getInsurancePolicies() {

        const response = await fetch(`/api/insurancePolicies?page=${pageNumber}`);
        const payload = await response.json();

        if (response.ok) {
            setInsurancePolicies(payload.data.data);
            setTotalPages(payload.data.pagination.total_pages)
        }
    }

    useEffect(() => {
        if (totalPages >= pageNumber) {
            getInsurancePolicies();
        }
    }, [pageNumber]);

    return (
        <>
            <h1 className="title">Insurance Policies</h1>

            {insurancePolicies.length > 0 ? (
                <>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Policy Number</th>
                                <th>Holder's Name</th>
                                <th>Insurance Type</th>
                                <th>Coverage Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insurancePolicies.map((insurancePolicy) => (
                                <tr key={insurancePolicy.id}>
                                    <td>{insurancePolicy.policy_number}</td>
                                    <td>{insurancePolicy.holder_name}</td>
                                    <td>{insurancePolicy.type_of_insurance}</td>
                                    <td>{insurancePolicy.coverage_amount}</td>
                                    <td className="inline-flex space-x-4">
                                        <Link
                                            to={`/insurancePolicies/view/${insurancePolicy.id}`}

                                        >
                                            <button className="success-btn w-16">View</button>
                                        </Link>
                                        {user &&
                                            <Link
                                                to={`/insurancePolicies/edit/${insurancePolicy.id}`}

                                            >
                                                <button className="danger-btn w-16">Edit</button>
                                            </Link>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} ></Pagination>
                </>
            ) : (
                <p>There are no Insurance Policies</p>
            )}
        </>
    );
}