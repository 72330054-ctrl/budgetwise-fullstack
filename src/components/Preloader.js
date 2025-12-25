import React from 'react';
import {Spinner} from 'react-bootstrap';
function Preloader(){
    return(
       <div className='d-flex justify-content-center algin-items-center vh-100 bg-100'>
          <div className='text-center'>
            <Spinner animation='border' variant='primary' role='status'></Spinner>
            <p className='mt-3 text-muted'> Laoding , please wait...</p>
          </div>
       </div>
    );
}
export default Preloader;