'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import JoditEditor, { Jodit } from 'jodit-react';
import { ImagePlus, Plus, X } from 'lucide-react';
import { addPost, getAuthorLoggedInfos } from 'services/firestore';
import categoriesList from 'utils/categoriesList';
import { makePostFormSchema, textEditorSchema } from 'utils/validations';
import { ZodError, z } from 'zod';

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

export type MakePostFormData = z.infer<typeof makePostFormSchema>;

export default function MakePostForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<MakePostFormData>({
    resolver: zodResolver(makePostFormSchema),
  });
  const [editorError, setEditorError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputTagsRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Jodit>(null);

  const router = useRouter();

  const session = useSession();

  const watchCoverImage = watch('coverImage');

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

  const joditEditorConfig = {
    readonly: false,
    height: 500,
  };

  const handleAddTag = () => {
    if (
      inputTagsRef.current?.value &&
      !tags.includes(inputTagsRef.current?.value)
    ) {
      const value = inputTagsRef.current.value.trim();
      setTags((prev) => [...prev, value]);
    }
  };

  const handleRemoveTag = (e: MouseEvent<SVGSVGElement>) => {
    const id = e.currentTarget.id;
    setTags((prev) => prev.filter((item) => item !== id));
  };

  const onSubmit = async (data: MakePostFormData) => {
    try {
      const authorLoggedInfos = await getAuthorLoggedInfos(
        session.data?.user?.email
      );

      if (!authorLoggedInfos) {
        alert('Falha ao enviar o post. Por favor, tente novamente mais tarde.');
        return;
      }
      setEditorError(null);
      const editorContent = textEditorSchema.parse(editorRef.current?.value);

      const response = await addPost({
        ...data,
        tags,
        content: editorContent,
        authorId: authorLoggedInfos.authorId,
      });

      if (response instanceof Error) {
        alert(response);
      }

      alert('Post enviado com sucesso!');
      router.push('/');
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = error.errors[0].message;
        setEditorError(validationError);
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

      <div>
        <JoditEditor config={joditEditorConfig} value="" ref={editorRef} />
        {editorError && <Input.HelperText>{editorError}</Input.HelperText>}
      </div>

      <Excerpt>
        <Input.Label htmlFor="excerpt">Subtítulo</Input.Label>
        <textarea id="excerpt" rows={2} {...register('excerpt')} />
        {errors.excerpt && (
          <Input.HelperText>{errors.excerpt.message}</Input.HelperText>
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
              <X size="1.3rem" onClick={handleRemoveTag} id={tag} />
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
        <Link href="/">Cancelar</Link>
        <Button.Root type="submit" width="10rem">
          {isSubmitting && <Button.IconSpin />}
          {!isSubmitting && 'Publicar'}
        </Button.Root>
      </Buttons>
    </MakePostFormContainer>
  );
}
