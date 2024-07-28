import { useState } from "react"

export default function Pagination({ pageNumber, setPageNumber, totalPages }) {
    let [num, setNum] = useState(pageNumber);
    let [cur, setCur] = useState(1);
    let [tot, setTot] = useState(totalPages);
    
    const pages = [
        { page: num },
        { page: tot >= num + 1 ? num + 1 : null},
        { page: tot >= num + 2 ? num + 2 : null },
    ];

    function Next() {
        tot > num && setNum(++num)
    }

    function back() {
        num > 1 && setNum(--num)
    }
    
    return (
        <div className="flex bg-white rounded-sm font-[Poppins]">
            <button onClick={back} className="h-8 border-2 border-r-0 border-slate-800
               px-2 rounded-l-lg hover:bg-slate-800 hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
            {
                pages.map((pg, i) => (
                    <button key={i} onClick={() => { setPageNumber(pg.page), setCur(pg.page) }} className={`h-8 border-2 border-r-0 border-slate-800
               w-8 ${cur === pg.page && 'bg-slate-800 text-white'}`}>{pg.page}</button>
                ))
            }
            <button onClick={Next} className="h-8 border-2  border-slate-800
               px-2 rounded-r-lg hover:bg-slate-800 hover:text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </button>
        </div>
    )
}