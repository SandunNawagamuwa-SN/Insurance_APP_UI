import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AppContext);

    const [inusrancePolicy, setInusrancePolicy] = useState(null);

    async function getInusrancePolicy() {
        const response = await fetch(`/api/insurancePolicies/${id}`);
        const payload = await response.json();

        if (response.ok) {
            setInusrancePolicy(payload.data);
        }
    }

    useEffect(() => {
        getInusrancePolicy();
    }, []);

    return (
        <>
            {inusrancePolicy ? (
                <div
                    key={inusrancePolicy.id}
                    className="mt-4 rounded-lg bg-white p-4 shadow-2xl shadow-blue-500/50 transition duration-300 hover:bg-blue-500/50"
                >
                    
                        <div>
                            <h2 className="font-bold text-2xl w-full text-center">Policy Number : {inusrancePolicy.policy_number}</h2>
                            <h3 className="font-bold text-xl">Holder Name : {inusrancePolicy.holder_name}</h3>
                            <div className="flex items-start justify-between">
                                <h3 className="font-normal text-base font-mono">Insurance Type : {inusrancePolicy.type_of_insurance}</h3>
                                <h3 className="font-normal text-base font-mono">Coverage Amount : {inusrancePolicy.coverage_amount}</h3>
                            </div>
                            <div>
                                <small className="text-xs text-slate-600">
                                    Created on{" "}
                                    {new Date(inusrancePolicy.created_at).toLocaleTimeString()}
                                </small>
                            </div>
                            <small className="text-xs text-slate-600">
                                Last Updated on{" "}
                                {new Date(inusrancePolicy.updated_at).toLocaleTimeString()}
                            </small>
                        
                    </div>
                    {/* <p>{post.body}</p> */}

                    {/* {user && user.id === post.user_id && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to={`/posts/update/${post.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
              >
                Update
              </Link>

              <form onSubmit={handleDelete}>
                <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                  Delete
                </button>
              </form>
            </div>
          )} */}
                </div>
            ) : (
                <p className="title">Insurance Policy not found!</p>
            )}
        </>
    );
}