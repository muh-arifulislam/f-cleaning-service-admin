import React, { useEffect, useState } from "react";
import CardTableCustomers from "../../components/Cards/CardTableCustomers";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        console.log(data);
      });
  }, []);
  return (
    <>
      <CardTableCustomers customers={customers} setCustomers={setCustomers} />
    </>
  );
};

export default Customers;
