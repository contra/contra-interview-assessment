import React, { useState } from 'react';
import { Button } from '@/components/Button';
import {
  ButtonGroup,
  Container,
  ErrorMessage,
  FormContainer,
  HeaderTitle,
  SubTitle,
  TextField,
  TextFieldArea,
  TextFieldLabel,
  TextFieldTitle,
} from './CreateProjectForm.styles';
import { useCreateProjectMutation } from '@/lib/client/graphql/generated';

interface CreateProjectFormProps {
  hide: () => void;
}

const imagesObj = [
  'https://contra.com/static/assets/VAPOR_GRADIENT_GREEN_DARK@2x.3c62cfa6.jpg',
  'https://contra.com/static/assets/VAPOR_GRADIENT_PURPLE_DARK@2x.2f277f42.jpg',
  'https://contra.com/static/assets/VAPOR_GRADIENT_SALMON_DARK@2x.f60242d9.jpg',
  'https://contra.com/static/assets/VAPOR_GRADIENT_WATERMELON_DARK@2x.dfc36551.jpg',
  'https://contra.com/static/assets/VAPOR_GRADIENT_WHITE_DARK@2x.e7fd9e76.jpg',
];

export function CreateProjectForm({ hide }: CreateProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
  });
  const [createProject, { loading }] = useCreateProjectMutation();

  const onSubmitHandler = async () => {
    if (!title && !description) {
      return setFormErrors({
        title: 'Title is required',
        description: 'Description is required',
      });
    }
    if (!title) {
      return setFormErrors((prev) => ({ ...prev, title: 'Title is required' }));
    }
    if (!description) {
      return setFormErrors((prev) => ({
        ...prev,
        description: 'Description is required',
      }));
    }

    const randomIndex = Math.floor(Math.random() * imagesObj.length); // Randomly returns an integer from 0 to 4
    const imageUrl = imagesObj[randomIndex] as string;
    const userId = '4f056d52-eb7e-4a05-b962-3ef4c1804d66';
    const variables = { title, description, imageUrl, userId };

    try {
      await createProject({ variables });
      hide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    setFormErrors((prev) => ({ ...prev, title: '' }));
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
    setFormErrors((prev) => ({ ...prev, description: '' }));
  };

  return (
    <Container>
      <HeaderTitle>Create a new project</HeaderTitle>
      <SubTitle>Fill out the form below to create a new project.</SubTitle>

      <FormContainer>
        <TextFieldTitle
          placeholder="Add a project title"
          maxLength={64}
          onChange={handleChangeTitle}
        />
        {formErrors.title && <ErrorMessage>{formErrors.title}</ErrorMessage>}
        <TextField>
          <TextFieldLabel>Preview Text</TextFieldLabel>
          <TextFieldArea
            placeholder="Add a short project description"
            onChange={handleChangeDescription}
          />
        </TextField>
        {formErrors.description && (
          <ErrorMessage>{formErrors.description}</ErrorMessage>
        )}

        <ButtonGroup>
          <Button
            label="Add project"
            isLoading={loading}
            onClickHandler={onSubmitHandler}
          />
          <Button label="Cancel" isCancel onClickHandler={hide} />
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
}
