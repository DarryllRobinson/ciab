import React, { useState, useEffect, useRef } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';

const useFetch = (url) => {
  const cache = useRef({});
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus('fetching');
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setStatus('fetched');
      } else {
        const response = await fetch(url);
        const data = await response.json();
        cache.current[url] = data; // set response in cache;
        setData(data);
        setStatus('fetched');
      }
    };

    fetchData();
  }, [url]);

  return { status, data };
};

function Dashboard(props) {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  console.log('useFetch: ', useFetch);

  return (
    <div>Loading...</div>
  );

}

export default Dashboard;
