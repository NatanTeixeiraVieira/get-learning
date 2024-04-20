'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Jodit } from 'jodit-react';
import { ImagePlus, Plus, X } from 'lucide-react';
import { savePost } from 'services/post';
import { MakePostFormData } from 'types/MakePostFormData';
import categoriesList from 'utils/categoriesList';
import { contentSchema, makePostFormSchema } from 'validations/schemas';
import { ZodError } from 'zod';

import {
  AllowComents,
  Classification,
  ClassificationFields,
  CoverImage,
  Display,
  IconPlus,
  Select,
  Excerpt,
  Buttons,
  TagText,
  MakePostFormContainer,
  PreviewImage,
} from './styles';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import TextEditor from 'components/TextEditor';

export default function MakePostForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<MakePostFormData>({
    resolver: zodResolver(makePostFormSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      category: 'Selecione a categoria',
      allowComents: true,
    },
  });

  const [tags, setTags] = useState<string[]>([]);

  const [previewImage, setPreviewImage] = useState('');
  const [contentError, setContentError] = useState('');

  const inputTagsRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Jodit>(null);

  const watchCoverImage: FileList = watch('coverImage');

  useEffect(() => {
    const handleCoverImageSelected = () => {
      if (errors.coverImage) {
        return;
      }

      const previewUrl = URL.createObjectURL(watchCoverImage[0]);
      setPreviewImage(previewUrl);
    };

    if (dirtyFields.coverImage) {
      handleCoverImageSelected();
    }
  }, [errors.coverImage, watchCoverImage, dirtyFields.coverImage]);

  const onSubmit = async ({
    title,
    subtitle,
    allowComents,
    category,
    coverImage,
  }: MakePostFormData) => {
    const content = handleFinishValidations();
    if (content) {
      const response = await savePost(
        title,
        subtitle,
        content,
        allowComents,
        [category],
        tags,
        coverImage
      );
    }
  };

  const handleAddTag = () => {
    const tag = inputTagsRef.current?.value ?? '';
    if (!tags.includes(tag)) {
      setTags((prev) => (tag ? [...prev, tag] : prev));
    }
  };

  const handleRemoveTag = (tagRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagRemove));
  };

  const handleFinishValidations = () => {
    try {
      const contentValidation = contentSchema.parse(editorRef.current?.value);
      setContentError('');
      return contentValidation;
    } catch (error) {
      if (error instanceof ZodError) {
        setContentError(error.issues[0].message);
      }
    }
  };

  return (
    <MakePostFormContainer onSubmit={handleSubmit(onSubmit)}>
      <Input.Root>
        <Input.Label htmlFor="title">Título</Input.Label>
        <Input.Input id="title" type="text" {...register('title')} />
        {errors.title && (
          <Input.HelperText>{errors.title.message}</Input.HelperText>
        )}
      </Input.Root>

      <TextEditor editorError={contentError} isEdit={false} ref={editorRef} />

      <Excerpt>
        <Input.Label htmlFor="subtitle">Subtítulo</Input.Label>
        <textarea id="subtitle" rows={2} {...register('subtitle')} />
        {errors.subtitle && (
          <Input.HelperText>{errors.subtitle.message}</Input.HelperText>
        )}
      </Excerpt>

      <Classification>
        <ClassificationFields>
          <label htmlFor="category">Categoria</label>
          <Select id="category" {...register('category')}>
            <option value="Selecione a categoria">Selecione a categoria</option>
            {categoriesList.map((category) => (
              <option value={category} key={`makePostForm-${category}`}>
                {category}
              </option>
            ))}
          </Select>
        </ClassificationFields>
        {errors.category && (
          <Input.HelperText>{errors.category.message}</Input.HelperText>
        )}
      </Classification>

      <Classification>
        <ClassificationFields>
          <Input.Label htmlFor="tags">Tags</Input.Label>
          <Input.Input id="tags" type="text" ref={inputTagsRef} reverse>
            #
          </Input.Input>
          <IconPlus onClick={handleAddTag}>
            <Plus />
          </IconPlus>
        </ClassificationFields>
        <Display>
          {tags.map((tag) => (
            <span key={`MakePostForm-${tag}`}>
              <TagText>{tag}</TagText>
              <X size="1.3rem" onClick={() => handleRemoveTag(tag)} id={tag} />
            </span>
          ))}
        </Display>
      </Classification>
      <AllowComents>
        <input
          defaultChecked
          type="checkbox"
          id="allowComents"
          {...register('allowComents')}
        />
        <label htmlFor="allowComents">Deseja permitir comentários?</label>
        {errors.allowComents && (
          <Input.HelperText>{errors.allowComents.message}</Input.HelperText>
        )}
      </AllowComents>

      <CoverImage>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          {...register('coverImage')}
        />
        <label htmlFor="coverImage">Fazer upload da imagem de capa</label>
        <PreviewImage htmlFor="coverImage">
          {!previewImage && <ImagePlus size="2rem" strokeWidth="1.5" />}
          {previewImage && (
            <Image src={previewImage} alt="Preview da imagem carregada" fill />
          )}
        </PreviewImage>
        {typeof errors.coverImage?.message === 'string' && (
          <Input.HelperText>{errors.coverImage.message}</Input.HelperText>
        )}
      </CoverImage>

      <Buttons>
        <Link href={!isSubmitting ? '/' : ''}>Cancelar</Link>
        <Button.Root
          type="submit"
          width="10rem"
          disabled={isSubmitting}
          onClick={handleFinishValidations}
        >
          {isSubmitting && <Button.IconSpin />}
          {!isSubmitting && 'Publicar'}
        </Button.Root>
      </Buttons>
    </MakePostFormContainer>
  );
}
