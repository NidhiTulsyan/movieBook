import React from 'react'
import '../Search.css';
import { Link } from 'react-router-dom';

export default function MovieCard(props) {
    const {title,description,date,Url,id} = props;
  return (
    <div className="col-6 col-md-4 col-lg-4 card mx-3 my-4 shadow-sm p-3 mb-5 bg-body rounded thumbnail" style={{width: "18rem"}}>
  <img src={Url} className="card-img-top" alt="..." height={'370px'} width={'250px'}/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text">{new Date(date).toLocaleDateString()}</p>
    <Link to={`/booking/${id}`} className="btn btn-outline-dark">Book Now</Link>
  </div>
</div>
  )
}
