//import { useUser } from 'features/authentication/useUser';
import { useState } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import {useUser} from '../authentication/useUser';
import { useUpdateUser } from './useUpdateUser';


function UpdateUserDataForm() {
  // We don't need the loading state
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const{updateUser , isUpdating} = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    if(!fullName) return;
    updateUser({fullName , avatar},{
      onSuccess: () => {
        setAvatar(null);
        e.target.reset();
      }}
      )
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>

      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <Button type='reset' variation='secondary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button >Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
