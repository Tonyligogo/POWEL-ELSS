import "./expensessummary.css"
import Sidebar from "../sidebar/sidebar"
import { Icon } from '@iconify/react';
import {useState, useEffect} from "react"
import axios from "axios";
import Table from "./Table";

function ExpensesSummary() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get(`http://localhost:5000?q=${query}`);
        setData(res.data);
      };
      if (query.length === 0 || query.length > 2) fetchData();
    }, [query]);

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="expensesSummaryHeading">  
                <h3>Expenses Summary</h3>
            </div>
            <div className="expensesSummary">
                <div className="searchBar">
                <Icon icon="mdi:search" color="gray" width="20" />
                <input
                    className="search"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value.toLowerCase())}
                />
                </div>
                <Table data={data} />
            </div>
          </div>
      </div>
  )
}

export default ExpensesSummary