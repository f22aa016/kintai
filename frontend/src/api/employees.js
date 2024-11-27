import React, { useEffect} from 'react';

const Employees = ({ setEmployees }) => {
    useEffect(() => {
      fetch('http://localhost:3001/api/employees')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch employees');
          }
          return response.json();
        })
        .then(data => setEmployees(data)) // 親コンポーネントにデータを渡す
        .catch(error => console.error('Error fetching data:', error));
    }, [setEmployees]);
  
    return null; // 表示する必要がないため、nullを返します
  };

export default Employees;
