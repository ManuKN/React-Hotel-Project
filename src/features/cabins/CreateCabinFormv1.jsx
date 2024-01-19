import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function CreateCabinFormv1({cabinToEdit ={}}) {
const{id:editId , ...editValues} = cabinToEdit;
const isEditSession = Boolean(editId);
  const{register , handleSubmit , reset , getValues , formState} = useForm(
    {defaultValues: isEditSession ? editValues : {}}
  )
  const{errors} = formState;
  const queryClient = useQueryClient()

  const{isLoading : isCreating , mutate:createCabin} = useMutation({
    mutationFn: createEditCabin,
    onSuccess:() => {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({
        queryKey:["cabins"]
      });
      reset();
    },
    onError:(err) => toast.error(err.message)
  })

  const{isLoading : isEditing , mutate:editCabin} = useMutation({
    mutationFn: ({newCabinData , id}) => createEditCabin(newCabinData , id),
    onSuccess:() => {
      toast.success("Cabin successfully Edited")
      queryClient.invalidateQueries({
        queryKey:["cabins"]
      });
      reset();
    },
    onError:(err) => toast.error(err.message)
  })

  const isWorking = isCreating || isEditing ;

  function formData(data){
const image = typeof data.image === 'string' ? data.image : data.image[0]

    if(isEditSession)
    editCabin({newCabinData:{...data , image} , id:editId});
   else
   createCabin({...data , image:image})
  //  console.log(data)
  }

function errorData(errors){
 console.log(errors)
}

  return (
    <Form onSubmit={handleSubmit(formData , errorData)}>
      <FormRow>
        <Label htmlFor="name">Cabin Name</Label>
        <Input type="text" id="name" disabled={isWorking} {...register("name" ,
        {required:"This field is Required",
        min:{
          value:1,
          message:"Name is required"
        }},)} />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity"  disabled={isWorking} {...register("maxCapacity" ,
        {required:"This field is Required",
        min:{
          value:1,
          message:"Capacity should be atleast 1"
        }},)} />
        {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice"  disabled={isWorking} {...register("regularPrice" ,
         {required:"This field is Required" ,
         min:{
          value:1,
          message:"Capacity should be atleast 1"
        }},)} />
        {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount"  disabled={isWorking} defaultValue={0} {...register("discount" ,
         {required:"This field is Required",
         validate:(value) =>Number(getValues().regularPrice) > Number(value) ||
         "Discount should be less than regular price"},)} />
         {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description"  disabled={isWorking} defaultValue="" {...register("description" ,
         {required:"This field is Required" , min:{
          value:1,
          message:"Capacity should be atleast 1"
        }},)} />
        {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image"  disabled={isWorking} accept="image/*" {...register("image",
        {
            required: isEditSession ? false : "This Field is required",
        })} />
      </FormRow>


      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinFormv1;
