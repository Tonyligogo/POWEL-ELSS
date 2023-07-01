import "./salessummary.css"
import Sidebar from "../sidebar/sidebar"
import { Icon } from '@iconify/react';
import {useState, useEffect} from "react"
import axios from "axios";
import Table from "./Table";

function SalesSummary() {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

  return (
    <div className="home">
        <Sidebar/>
          <div className="homeContainer">
            <div className="salesSummaryHeading">  
                <h3>Sales Summary</h3>
            </div>
            <div className="salesSummary">
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

export default SalesSummary