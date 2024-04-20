'use client';

import { forwardRef } from 'react';

import JoditEditor, { Jodit, IJoditEditorProps } from 'jodit-react';

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
  const joditEditorConfig: IJoditEditorProps['config'] = {
    readonly: false,
    height: 500,
    theme: 'currentTheme.title',
    toolbarButtonSize: 'middle',
    enter: 'p',
    defaultMode: 1,
    defaultActionOnPaste: 'insert_as_text',
    removeButtons: ['font', 'fontsize', 'lineHeight'],
  };

  return (
    <Container>
      <JoditEditor config={joditEditorConfig} value="" ref={ref} />
      {editorError && <Input.HelperText>{editorError}</Input.HelperText>}
    </Container>
  );
});
