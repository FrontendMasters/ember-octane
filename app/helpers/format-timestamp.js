import { helper } from '@ember/component/helper';
import { dateToString } from 'shlack/utils/date';

// hash is the key value pairs
export default helper(function formatTimestamp(params/*, hash*/) {
  const [dateIsh] = params;

  return dateToString(dateIsh);
});
