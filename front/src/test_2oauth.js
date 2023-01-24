import React, { useEffect, useState } from "react";
import axios from 'axios';



function Jeff() {
  const searchParams = new URLSearchParams(document.location.search)
  const [test, setTest] = useState(null);
  useEffect(() => {
    if(searchParams.get('code') !== null){
      setTest('yes');
    }
  }, []);

  return (
    <div className="App">
      {test !== 'code exist' ? (
        <div>{test}</div>
      ) : null}
      <div>{searchParams.get('code')}</div>
      <a href="https://www.betaseries.com/authorize?client_id=4477894572cc&redirect_uri=http://localhost:3000/">register</a>
    </div>
  );
}

export default Jeff;
