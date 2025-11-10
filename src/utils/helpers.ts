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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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

/**
 * Конвертирует копейки в рубли с форматированием
 * @param kopecks - сумма в копейках
 * @param showCurrency - показывать ли символ рубля (по умолчанию true)
 * @returns отформатированная строка
 *
 * @example
 * formatRubles(10000) // "100 ₽"
 * formatRubles(15050) // "150.50 ₽"
 * formatRubles(99) // "0.99 ₽"
 * formatRubles(10000, false) // "100"
 */
export const formatRubles = (kopecks: number, showCurrency: boolean = true): string => {
  const rubles = kopecks / 100;
  const hasKopecks = kopecks % 100 !== 0; // Проверяем есть ли копейки

  // Число с пробелами для разрядов
  const formatted = rubles.toLocaleString("ru-RU", {
    minimumFractionDigits: hasKopecks ? 2 : 0, // Если есть копейки - 2 знака, иначе 0
    maximumFractionDigits: 2,
  });

  return showCurrency ? `${formatted} ₽` : formatted;
};

//другое
// /**
//  * Конвертирует копейки в рубли (просто число)
//  * @param kopecks - сумма в копейках
//  * @returns число в рублях
//  *
//  * @example
//  * kopecksToRubles(10000) // 100
//  * kopecksToRubles(15050) // 150.5
//  */
// export const kopecksToRubles = (kopecks: number): number => {
//   return kopecks / 100;
// };
//
// /**
//  * Конвертирует рубли в копейки
//  * @param rubles - сумма в рублях
//  * @returns число в копейках
//  *
//  * @example
//  * rublesToKopecks(100) // 10000
//  * rublesToKopecks(150.5) // 15050
//  */
// export const rublesToKopecks = (rubles: number): number => {
//   return Math.round(rubles * 100);
// };
//
// /**
//  * Форматирует рубли с пробелами для тысяч (без копеек)
//  * @param kopecks - сумма в копейках
//  * @returns отформатированная строка
//  *
//  * @example
//  * formatRublesShort(1000000) // "10 000 ₽"
//  * formatRublesShort(150000) // "1 500 ₽"
//  */
// export const formatRublesShort = (kopecks: number): string => {
//   const rubles = Math.floor(kopecks / 100);
//
//   const formatted = rubles.toLocaleString('ru-RU');
//
//   return `${formatted} ₽`;
// };
