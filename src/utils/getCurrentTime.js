export const getCurrentTime = () => {
  let newDate = new Date();
  let currentDate = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
    newDate.getSeconds(),
  );
  return currentDate;
};
