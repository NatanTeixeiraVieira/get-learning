'use client';

import { forwardRef } from 'react';

import { useToggleTheme } from 'hooks/useToggleTheme';
import JoditEditor, { Jodit, IJoditEditorProps } from 'jodit-react';
import usePostStore from 'store/post';

import { Container } from './styles';

import { Input } from 'components/Input';

type TextEditorProps = {
  editorError: string | null;
  isEdit: boolean;
};

export default forwardRef<Jodit, TextEditorProps>(function TextEditor(
  { editorError, isEdit },
  ref
) {
  const currentTheme = useToggleTheme();
  const { post } = usePostStore().state;

  const joditEditorConfig: IJoditEditorProps['config'] = {
    readonly: false,
    height: 500,
    theme: currentTheme.title,
  };
  return (
    <Container>
      <JoditEditor
        config={joditEditorConfig}
        value={isEdit && post ? post.content : ''}
        ref={ref}
      />
      {editorError && <Input.HelperText>{editorError}</Input.HelperText>}
    </Container>
  );
});
