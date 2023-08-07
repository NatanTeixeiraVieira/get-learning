import { TranslateApiResponse } from 'types/translateApiResponse';

const translateText = async (
  text: string,
  langFrom = 'en',
  langTo = 'pt-BR'
) => {
  const responseTranslation = await fetch(
    `${process.env.NEXT_PUBLIC_TRANSLATE_API_BASE_URL}${text}&langpair=${langFrom}|${langTo}`
  );
  const translationDatas: TranslateApiResponse =
    await responseTranslation.json();
  const translatedText = translationDatas.responseData.translatedText;
  const translatedTextLowerCase = translatedText.toLowerCase();
  const translatedTextCapitalized = translatedTextLowerCase[0]
    .toUpperCase()
    .concat(translatedTextLowerCase.substring(1));
  return translatedTextCapitalized;
};

export default translateText;
