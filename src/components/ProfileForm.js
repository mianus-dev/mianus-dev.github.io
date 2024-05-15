import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em 0;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  &:hover {
    background-color: white;
    color: palevioletred;
  }
`;

const ProfileForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/persons', data);
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>First Name:</Label>
      <Input type="text" {...register('first_name', { required: 'First name is required' })} />
      {errors.first_name && <p>{errors.first_name.message}</p>}

      <Label>Last Name:</Label>
      <Input type="text" {...register('last_name', { required: 'Last name is required' })} />
      {errors.last_name && <p>{errors.last_name.message}</p>}

      <Label>Native Name:</Label>
      <Input type="text" {...register('native_name')} />

      <Label>Title:</Label>
      <Input type="text" {...register('title')} />

      <Button type="submit">Save</Button>
    </Form>
  );
};

export default ProfileForm;
