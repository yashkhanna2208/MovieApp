import moment from 'moment';

export const getFormattedDate = (date: string) => {
  return moment(date).format('DD MMMM YYYY');
};
