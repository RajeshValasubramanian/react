
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './form.css';

const Displayform=({details,onEdit,onDelete})=>{
    if(details.length === 0){
        return(
         <h2>No details found</h2>
        )
    }
    return(
        <div>
        <h2>Employee Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {details.map((detail,index)=>{
                    return(
                        <tr key={index}>
                            <td>{detail.name}</td>
                            <td>{detail.age}</td>
                            <td>{detail.department}</td>
                            <td>{detail.position}</td>
                            <td>{detail.salary}</td>
                            <td>
                              <div className='btn'>'  <button onClick={()=>onEdit(detail)}>Edit</button></div>
                               <div className='btn1'>' <button onClick={()=>onDelete(detail)}>Delete</button></div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
        </div>

        

       
    )
}
function Empform(){
    const[detail,setDetail] = useState({
        name:"",
        age:"",
        department:"",
        position:"",
        salary:""
    });
    const[details,setDetails] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5005/detail")
        .then(res=>{
            setDetails(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setDetail({
            ...detail,
            [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(detail.id){
            axios.put(`http://localhost:5005/detail/${detail.id}`,detail)
            .then(res=>{
                setDetails(details.map(item=>{
                    if(item.id===detail.id){
                        return detail;
                    }
                    return item;
                }));
                setDetail({
                    name:"",
                    age:"",
                    department:"",
                    position:"",
                    salary:""
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
        else{
            axios.post("http://localhost:5005/detail",detail)
            .then(res=>{
                setDetails([...details,res.data]);
                setDetail({
                    name:"",
                    age:"",
                    department:"",
                    position:"",
                    salary:""
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    const onEdit=(detail)=>{
        setDetail(detail);
    }
    const onDelete=(detail)=>{
        axios.delete(`http://localhost:5005/detail/${detail.id}`)
        .then(res=>{
            setDetails(details.filter(item=>item.id!==detail.id));
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <div>
            <h1>Employee Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" name="name" value={detail.name} onChange={handleChange}/>
                <input type="text" placeholder="Age" name="age" value={detail.age} onChange={handleChange}/>
                <input type="text" placeholder="Department" name="department" value={detail.department} onChange={handleChange}/>
                <input type="text" placeholder="Position" name="position" value={detail.position} onChange={handleChange}/>
                <input type="text" placeholder="Salary" name="salary" value={detail.salary} onChange={handleChange}/>
                <button type="submit">{detail.id?"Update":"Submit"}</button>
            </form>
            <Displayform details={details} onEdit={onEdit} onDelete={onDelete}/>
        </div>
    )
        }
        

export default Empform;
