import React, { useEffect, useState } from "react";
import {
  getAllCustomers,
} from '../../fetches';
import CustomerCard from './CustomerCard';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCustomers();
      console.log(response);
      setCustomers(response);
    };
    fetchData();
    return () => {
      setCustomers([]);
    };
  }, []);
  return(
    <article>
      <h1>LISTAGEM DE CLIENTES</h1>
      <div>
      { customers.length >= 1 ? customers
        .map((customer, index) => (<CustomerCard
          customer={ customer }
          key={ index }
          index={ index }
        />)) : <div>Nenhum Cliente ainda</div>}
      </div>
    </article>
  );
}

export default CustomerList;