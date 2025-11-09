/**
 * Склоняет слово в зависимости от числа
 * @param count - число
 * @param words - массив из 3 форм слова [1, 2, 5]
 * @returns склонённое слово
 *
 * @example
 * pluralize(1, ['токен', 'токена', 'токенов']) // "токен"
 * pluralize(2, ['токен', 'токена', 'токенов']) // "токена"
 * pluralize(5, ['токен', 'токена', 'токенов']) // "токенов"
 */
export const pluralize = (count: number, words: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const absCount = Math.abs(count) % 100;
  const n = absCount % 10;

  if (absCount > 10 && absCount < 20) {
    return words[2];
  }

  return words[cases[n < 5 ? n : 5]];
};

/**
 * Возвращает число со склонённым словом
 * @param count - число
 * @param words - массив из 3 форм слова
 * @returns строка "число + слово"
 *
 * @example
 * pluralizeWithCount(1, ['токен', 'токена', 'токенов']) // "1 токен"
 * pluralizeWithCount(21, ['токен', 'токена', 'токенов']) // "21 токен"
 */
export const pluralizeWithCount = (count: number, words: [string, string, string]): string => {
  return `${count} ${pluralize(count, words)}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addStartZeroLesserTen = (num: any) => (num < 10 ? `0${num}` : num);

export const formatDate = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stringDate: any,
  { showDate = true, showTime = true } = { showDate: true, showTime: true },
) => {
  const date = new Date(stringDate);

  if (!(date instanceof Date && !isNaN(date))) {
    return "-";
  }

  const day = addStartZeroLesserTen(date.getDate());
  const month = addStartZeroLesserTen(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = addStartZeroLesserTen(date.getHours());
  const minutes = addStartZeroLesserTen(date.getMinutes());

  const resultDate = `${day}.${month}.${year}`;
  const resultTime = `${hours}:${minutes}`;

  return `${showDate ? resultDate : ""} ${showTime ? resultTime : ""}`;
};
