import React, { useState } from 'react';
import './SearchBar.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Form, Input, Label } from 'reactstrap';

const SearchBar = ({onSubmit}) => {

    const history = useHistory();

    const [ formData, setFormData ] = useState({
        search_term: ""
    });

    const onChange = (e) => {
        setFormData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmitPreventDefault = (e) => {
        e.preventDefault();
        history.push('/search');
        onSubmit(formData.search_term);
    }

    return (
        <div className='SearchBar'>
          <Form onSubmit={onSubmitPreventDefault}>
            <Label className='SearchBar-Input' htmlFor="search_term"><h2>First Name </h2></Label>
            <Input className='SearchBar-Input' id="search_term" name="search_term" type="text" onChange={onChange} value={formData.search_term}></Input>
            <Button className='SearchBar-Input'>Search</Button>
          </Form>
        </div>
    );

};

export default SearchBar;