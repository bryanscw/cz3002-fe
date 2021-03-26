export const calculateAge = (birthday) => { // birthday is a date
  const ageDifMs = Date.now() - Date.parse(birthday);
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};