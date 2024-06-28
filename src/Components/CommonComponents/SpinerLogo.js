import Spinner from 'react-bootstrap/Spinner';   

 const SpinerLogo=()=> {
    return (
      <>
      <div className='d-flex justify-content-center align-items-center'>
        <Spinner animation="border" variant="success" className='text-center'/>
        </div>
      </>
    );
  }

export default SpinerLogo;  